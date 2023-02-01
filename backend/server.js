// Import classes
const { LiveGames } = require("./utils/liveGames");
const { Players } = require("./utils/players");

// Import dependencies
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
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

const spotify_redirect_uri = `${process.env.APP_URL}/callback`;

app.get("/api/spotify-login", (req, res) => {
	const authorizeUrl =
		"https://accounts.spotify.com/authorize?" +
		querystring.stringify({
			response_type: "code",
			client_id: process.env.SPOTIFY_CLIENT_ID,
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
				grant_type: "client_credentials",
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

// Web Socket ====================================================================
// When connection is made from client
io.on("connection", (socket) => {
	// When host starts a lobby
	socket.on("host-start-lobby", (data) => {
		console.log(data);
		// Generate lobby code
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let lobbyCode = "";
		for (var i = 0; i < 6; i++) {
			lobbyCode += characters.charAt(Math.floor(Math.random() * 36));
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

		console.log(livePlayers);
		console.log(liveGames);

		socket.emit("show-lobby-code", { lobbyCode: lobbyCode, hostId: socket.id });
	});

	socket.on("host-start-game", ({ category, hostId }) => {
		console.log("host-start-game received");
		var game = liveGames.getGameByHostId(hostId); // Get the game based on socket.id
		game.gameStarted = true;
		game.gameData.category = category;
		socket.emit("game-started", game.hostId); // Tell host that game has started
	});

	// When host joins game
	socket.on("host-join-game", ({ lobbyCode }) => {
		console.log("host-join-game receieved");
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

			socket.emit("game-questions", [
				{
					question: "Name a song that makes you feel like you are levitating.",
					image: null,
				},
				{
					question:
						"Name the song you would play when going for a PR in the gym.",
					image: null,
				},
				{
					question: "Name a song that doesn't get enough love.",
					image: null,
				},
			]);

			socket.emit("update-host-on-connected-players", connectedPlayers);
		} else {
			socket.emit("no-game-found");
		}
	});

	// When player joins game
	socket.on("player-join", ({ lobbyCode, playerName }) => {
		const matchingGame = liveGames.getGameByLobbyCode(lobbyCode);

		if (matchingGame) {
			var hostId = matchingGame.hostId; //Get the id of the host of game

			livePlayers.addPlayer(hostId, socket.id, playerName, 0); //add player to game

			socket.join(lobbyCode); //Player is joining room based on lobby code
			liveGames.addConnectedPlayer(hostId, socket.id);

			const updatedPlayers = liveGames
				.getConnectedPlayerIds(hostId)
				.map((id) => livePlayers.getPlayer(id));

			io.to(lobbyCode).emit("update-host-on-connected-players", updatedPlayers); //Sending host player data to display
		} else {
			// No game has been found
			socket.emit("no-game-found");
		}
	});

	// When a host or player leaves the site
	socket.on("disconnect", () => {
		let game = liveGames.getGameByHostId(socket.id); //Finding game with socket.id
		//If a game hosted by that id is found, the socket disconnected is a host
		console.log("socket disconnected");
		if (game) {
			console.log(game);
			//Checking to see if host was disconnected or was sent to game view
			if (game.gameStarted == false || game.gameLive == true) {
				console.log("Game ended with code:", game.lobbyCode);

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
				console.log("Player leaving named:", player.playerName);
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
			liveGames.removeGame(socket.id); //Remove the game from games class
			console.log("Game ended with code:", game.lobbyCode);

			const playersToRemove = liveGames.getConnectedPlayerIds(game.hostId); //Getting all players in the game

			playersToRemove.map((p) => livePlayers.removePlayer(p.playerId)); //Removing each player from player class

			socket.leave(game.lobbyCode); //Socket is leaving room
		}
	});
});
