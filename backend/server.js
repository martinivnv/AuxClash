// Import classes
const { LiveGames } = require("./utils/liveGames");
const { Players } = require("./utils/players");

// Import dependencies
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socketIO = require("socket.io");

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

		liveGames.addGame(lobbyCode, socket.id, false, {
			stage: 0,
			round: 0,
			category: null,
		});

		socket.join(lobbyCode);

		socket.emit("show-lobby-code", { lobbyCode: lobbyCode, hostId: socket.id });
	});

	socket.on("host-start-game", ({ category, hostId }) => {
		console.log("host-start-game received");
		var game = liveGames.getGameByHostId(hostId); // Get the game based on socket.id
		game.gameLive = true;
		game.gameData.category = category;
		socket.emit("game-started", game.hostId); // Tell host that game has started
	});

	// When host joins game
	socket.on("host-join-game", ({ lobbyCode }) => {
		console.log("host-join-game receieved");
		var game = liveGames.getGameByLobbyCode(lobbyCode); //Gets game with old host id
		if (game) {
			const oldHostId = game.hostId;
			game.hostId = socket.id; //Changes the game host id to new host id
			socket.join(game.lobbyCode);
			let connectedPlayers = [];
			for (var i = 0; i < Object.keys(livePlayers.players).length; i++) {
				if (livePlayers.players[i].hostId == oldHostId) {
					livePlayers.players[i].hostId = socket.id;
					connectedPlayers.push(livePlayers.players[i]);
				}
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

		if (typeof matchingGame !== "undefined") {
			var hostId = matchingGame.hostId; //Get the id of the host of game

			livePlayers.addPlayer(hostId, socket.id, playerName, {
				score: 0,
				submissions: [[]],
			}); //add player to game

			socket.join(lobbyCode); //Player is joining room based on lobby code

			let updatedPlayers = livePlayers.getPlayers(hostId);

			io.to(lobbyCode).emit("update-player-lobby", updatedPlayers); //Sending host player data to display
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
			if (game.gameLive == false) {
				liveGames.removeGame(socket.id); //Remove the game from games class
				console.log("Game ended with code:", game.lobbyCode);

				let playersToRemove = livePlayers.getPlayers(game.hostId); //Getting all players in the game

				playersToRemove.map((p) => livePlayers.removePlayer(p.playerId)); //Removing each player from player class

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

					if (game.gameLive == false) {
						livePlayers.removePlayer(socket.id); //Removes player from players class
						let playersInGame = livePlayers.getPlayers(lobbyCode);

						io.to(lobbyCode).emit("update-player-lobby", playersInGame); //Sends data to host to update screen
						socket.leave(lobbyCode); //Player is leaving the room
					}
				}
			}
		}
	});

	socket.on("game-stage-change", ({ newStage, lobbyCode }) => {
		io.to(lobbyCode).emit("update-players-on-stage-change", newStage);
	});

	socket.on(
		"answer-submitted",
		({ playerId, lobbyCode, songTitle, songId }) => {
			io.to(lobbyCode).emit("update-host-on-player-answer", {
				playerId: playerId,
				songTitle: songTitle,
				songId: songId,
			});
		}
	);

	socket.on(
		"all-combined-submissions",
		({ submissions, lobbyCode, hostId }) => {
			io.to(lobbyCode).emit("send-submissions-for-voting", {
				hostId: hostId,
				submissions: submissions,
			});
		}
	);

	socket.on("vote-submitted", ({ playerId, votedSongId, hostId }) => {
		io.to(hostId).emit("update-host-on-vote", {
			playerId: playerId,
			votedSongId: votedSongId,
		});
	});

	console.log(livePlayers);
	console.log(liveGames);
});
