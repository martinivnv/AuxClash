// Import classes
const { LiveGames } = require("./utils/liveGames");
const { Players } = require("./utils/players");

//Import questions
const partyPrompts = require("./utils/prompts/partyPrompts").partyPrompts;

// Import dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const querystring = require("querystring");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = socketIO(server, {
	cors: {
		origin: process.env.CORS_ORIGIN,
		methods: ["GET", "POST"],
	},
});
app.use(cors());

// Initialize classes
var liveGames = new LiveGames();
var livePlayers = new Players();

// // MongoDB setup
// const uri = process.env.ATLAS_URI;
// mongoose.set("strictQuery", false);
// mongoose.connect(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
// const connection = mongoose.connection;
// connection.once("open", () => {
// 	console.log("Connection to MongoDB established successfully.");
// });

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

// Spotify Login =================================================================
const generateRandomState = (length) => {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};

const spotify_redirect_uri = `${process.env.APP_URL}/callback`;

app.get("/api/spotify-login", (req, res) => {
	const scope =
		"playlist-modify-public playlist-modify-private user-read-email user-read-private";
	const state = generateRandomState(16);
	const authorizeUrl =
		"https://accounts.spotify.com/authorize?" +
		querystring.stringify({
			response_type: "code",
			client_id: process.env.SPOTIFY_CLIENT_ID,
			state: state,
			scope: scope,
			redirect_uri: spotify_redirect_uri,
		});
	res.json({ authorizationUrl: authorizeUrl });
});

app.get("/api/callback", async (req, res) => {
	try {
		const { code } = req.query;
		const { data } = await axios({
			method: "post",
			url: "https://accounts.spotify.com/api/token",
			data: querystring.stringify({
				grant_type: "authorization_code",
				code,
				redirect_uri: spotify_redirect_uri,
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
				).toString("base64")}`,
			},
		});
		res.send(data);
	} catch (e) {
		res.status(500).send(e);
		console.log(e);
	}
});

// Create Spotify playlist =======================================================
app.use(express.json());

const generatePlaylistTitle = () => {
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();

	return (
		"Aux Clash " + year + "-" + month + "-" + date + " " + hours + ":" + minutes
	);
};

app.post("/api/create-spotify-playlist", async (req, res) => {
	try {
		// Get the access token from the request header
		const accessToken = req.body.accessToken;

		// Define the playlist name and description
		const playlistName = generatePlaylistTitle();
		const playlistDescription = "A playlist created with Aux Clash!";

		// Define the list of track IDs to add to the playlist
		const trackIds = req.body.trackIds;

		//	Get user id
		const getUserId = await axios({
			method: "get",
			url: `https://api.spotify.com/v1/me`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		const userId = getUserId.data.id;

		// Create the playlist
		const createPlaylistResponse = await axios({
			method: "post",
			url: `https://api.spotify.com/v1/users/${userId}/playlists`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				name: playlistName,
				description: playlistDescription,
				public: false,
			}),
		});

		// Get the ID of the newly created playlist
		const playlistId = createPlaylistResponse.data.id;

		// Add tracks to the playlist
		const addTracksResponse = await axios({
			method: "post",
			url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				uris: trackIds.map((id) => `spotify:track:${id}`),
			}),
		});

		// Send a response indicating success
		res.status(200).send("Playlist created successfully!");
	} catch (e) {
		// Send a response indicating failure
		console.error(e);
		res.status(500).send("Error creating playlist");
	}
});

// Web Socket ====================================================================
// When connection is made from client
io.on("connection", (socket) => {
	// When host starts a lobby
	socket.on("host-start-lobby", (data) => {
		// Generate lobby code
		const characters = "ABCDEFHJKLMNPQRSTVWXYZ123456789";
		let lobbyCode = "";
		for (var i = 0; i < 6; i++) {
			lobbyCode += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}

		liveGames.addGame(
			lobbyCode,
			socket.id,
			false,
			false,
			{
				stage: 0,
				round: 0,
				category: null,
			},
			[]
		);

		socket.join(lobbyCode);

		socket.emit("show-lobby-code", { lobbyCode: lobbyCode, hostId: socket.id });
	});

	socket.on("host-start-game", ({ category, hostId }) => {
		var game = liveGames.getGameByHostId(hostId); // Get the game based on socket.id
		game.gameStarted = true;
		game.gameData.category = category;
		socket.emit("game-started", game.hostId); // Tell host that game has started
	});

	// When host joins game
	socket.on("host-join-game", ({ lobbyCode }) => {
		var game = liveGames.getGameByLobbyCode(lobbyCode); //Gets game with old host id
		if (game) {
			const oldHostId = game.hostId;
			liveGames.updateGameHostId(oldHostId, socket.id); //Changes the game host id to new host id
			socket.join(game.lobbyCode);
			liveGames.setGameLive(socket.id); // This makes it so that when the host disconnects, all players are kicked

			const connectedPlayers = liveGames
				.getConnectedPlayerIds(socket.id)
				.map((id) => livePlayers.getPlayer(id));
			for (var i = 0; i < connectedPlayers.length; i++) {
				livePlayers.updateHostId(connectedPlayers[i].playerId, socket.id);
			}

			// Shuffle array
			const shuffledQuestions = [...partyPrompts].sort(
				() => 0.5 - Math.random()
			);

			// Get sub-array of first n elements after shuffled
			let selectedQuestions = shuffledQuestions.slice(0, 3);

			socket.emit("game-questions", selectedQuestions);

			socket.emit("update-host-on-connected-players", connectedPlayers);
		} else {
			socket.emit("no-game-found");
		}
	});

	// When player joins game
	socket.on("player-join", ({ lobbyCode, playerName }) => {
		const matchingGame = liveGames.getGameByLobbyCode(lobbyCode);

		if (matchingGame) {
			if (!matchingGame.gameStarted) {
				console.log(playerName, "joined");
				var hostId = matchingGame.hostId; //Get the id of the host of game
				if (liveGames.getConnectedPlayerIds(hostId).length < 8) {
					livePlayers.addPlayer(hostId, socket.id, playerName, 0); //add player to game

					socket.join(lobbyCode); //Player is joining room based on lobby code
					liveGames.addConnectedPlayer(hostId, socket.id);

					const updatedPlayers = liveGames
						.getConnectedPlayerIds(hostId)
						.map((id) => livePlayers.getPlayer(id));

					io.to(lobbyCode).emit(
						"update-host-on-connected-players",
						updatedPlayers
					); //Sending host player data to display
				} else {
					// No game has been found
					socket.emit("no-game-found");
				}
			} else {
				// No game has been found
				socket.emit("no-game-found");
			}
		} else {
			// No game has been found
			socket.emit("no-game-found");
		}
	});

	// When a host or player leaves the site
	socket.on("disconnect", () => {
		let game = liveGames.getGameByHostId(socket.id); //Finding game with socket.id
		//If a game hosted by that id is found, the socket disconnected is a host
		if (game) {
			//Checking to see if host was disconnected or was sent to game view
			if (game.gameStarted == false || game.gameLive == true) {
				let playersToRemove = liveGames.getConnectedPlayerIds(socket.id); //Getting all players in the game

				playersToRemove.map((p) => livePlayers.removePlayer(p.playerId)); //Removing each player from player class

				liveGames.removeGame(socket.id); //Remove the game from games class

				io.to(game.lobbyCode).emit("host-disconnect"); //Send player back to 'join' screen
				socket.leave(game.lobbyCode); //Socket is leaving room
			}
		} else {
			//No game has been found, so it is a player socket that has disconnected
			let player = livePlayers.getPlayer(socket.id); //Getting player with socket.id
			//If a player has been found with that id
			if (player) {
				let hostId = player.hostId; //Gets id of host of the game
				game = liveGames.getGameByHostId(hostId); //Gets game data with hostId
				if (game) {
					let lobbyCode = game.lobbyCode; //Gets the lobby code of the game
					livePlayers.removePlayer(socket.id); //Removes player from players class
					liveGames.removeConnectedPlayer(hostId, socket.id);

					const playersInGame = liveGames
						.getConnectedPlayerIds(hostId)
						.map((id) => livePlayers.getPlayer(id));

					io.to(lobbyCode).emit(
						"update-host-on-connected-players",
						playersInGame
					); //Sends data to host to update screen
					socket.leave(lobbyCode); //Player is leaving the room
				} else {
					livePlayers.removePlayer(socket.id); //Removes player from players class
				}
			}
		}
	});

	socket.on("game-stage-change", ({ newStage, lobbyCode }) => {
		io.to(lobbyCode).emit("update-players-on-stage-change", newStage);
	});

	socket.on("answer-submitted", ({ playerId, lobbyCode, query }) => {
		io.to(lobbyCode).emit("update-host-on-player-answer", {
			playerId: playerId,
			query: query,
		});
	});

	socket.on(
		"all-combined-submissions",
		async ({ submissions, lobbyCode, hostId, accessToken }) => {
			let foundSongs = [];
			for (let i = 0; i < submissions.length; i++) {
				try {
					const response = await axios({
						method: "GET",
						url: "https://api.spotify.com/v1/search",
						params: {
							q: submissions[i].query,
							type: "track",
							market: "US",
							limit: 1,
						},
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					});
					// More specifically only going to need:
					// artist name - response.data.tracks.items[0].artists[0].name
					// song name - response.data.tracks.items[0].name
					// song id - response.data.tracks.items[0].id
					foundSongs.push({
						songArtist: response.data.tracks.items[0].artists[0].name,
						songTitle: response.data.tracks.items[0].name,
						songId: response.data.tracks.items[0].id,
						thumbnail: response.data.tracks.items[0].album.images[2],
						playerId: submissions[i].playerId,
					});
				} catch (error) {
					console.log(error);
				}
			}

			io.to(lobbyCode).emit("songs-found", {
				hostId: hostId,
				submissions: foundSongs,
			});
		}
	);

	socket.on(
		"vote-submitted",
		({ playerId, votedSongId, hostId, votedSongTitle }) => {
			io.to(hostId).emit("update-host-on-vote", {
				playerId: playerId,
				votedSongId: votedSongId,
				votedSongTitle: votedSongTitle,
			});
		}
	);

	socket.on("game-over", () => {
		let game = liveGames.getGameByHostId(socket.id); //Finding game with socket.id
		//If a game hosted by that id is found, the socket disconnected is a host
		if (game) {
			const playersToRemove = liveGames.getConnectedPlayerIds(game.hostId); //Getting all players in the game

			playersToRemove.map((p) => livePlayers.removePlayer(p.playerId)); //Removing each player from player class

			liveGames.removeGame(socket.id); //Remove the game from games class
			socket.leave(game.lobbyCode); //Socket is leaving room
		}
	});
});
