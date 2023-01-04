// Import classes
const { LiveGames } = require("./utils/liveGames");
const { Players } = require("./utils/players");

// Import dependencies
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socketIO = require("socket.io");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
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
var players = new Players();

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
	// When host connects to the server
	socket.on("host-join", (data) => {
		console.log(data);
		// Generate lobby code
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let lobbyCode = "";
		for (var i = 0; i < 6; i++) {
			lobbyCode += characters.charAt(Math.floor(Math.random() * 26));
		}

		liveGames.addGame(lobbyCode, socket.id, false, [], {
			stage: 0,
			round: 0,
		});

		socket.join(lobbyCode);

		socket.emit("show-lobby-code", { lobbyCode: lobbyCode });
	});

	// When player joins game
	socket.on("player-join", ({ lobbyCode, playerName }) => {
		const matchingGame = liveGames.getGameByLobbyCode(lobbyCode);

		if (typeof matchingGame !== "undefined") {
			var hostId = matchingGame.hostId; //Get the id of the host of game

			players.addPlayer(hostId, socket.id, playerName, {
				score: 0,
				answer: 0,
			}); //add player to game

			socket.join(lobbyCode); //Player is joining room based on lobby code

			matchingGame.players.push({
				playerName: playerName,
				playerId: socket.id,
			}); // Add player to the game's player list

			io.to(lobbyCode).emit("update-player-lobby", matchingGame.players); //Sending host player data to display
		} else {
			// No game has been found
			socket.emit("no-game-found");
		}
	});

	//When a host or player leaves the site
	// socket.on("disconnect", () => {
	// 	var game = games.getGame(socket.id); //Finding game with socket.id
	// 	//If a game hosted by that id is found, the socket disconnected is a host
	// 	if (game) {
	// 		//Checking to see if host was disconnected or was sent to game view
	// 		if (game.gameLive == false) {
	// 			games.removeGame(socket.id); //Remove the game from games class
	// 			console.log("Game ended with pin:", game.pin);

	// 			var playersToRemove = players.getPlayers(game.hostId); //Getting all players in the game

	// 			//For each player in the game
	// 			for (var i = 0; i < playersToRemove.length; i++) {
	// 				players.removePlayer(playersToRemove[i].playerId); //Removing each player from player class
	// 			}

	// 			io.to(game.pin).emit("hostDisconnect"); //Send player back to 'join' screen
	// 			socket.leave(game.pin); //Socket is leaving room
	// 		}
	// 	} else {
	// 		//No game has been found, so it is a player socket that has disconnected
	// 		var player = players.getPlayer(socket.id); //Getting player with socket.id
	// 		//If a player has been found with that id
	// 		if (player) {
	// 			var hostId = player.hostId; //Gets id of host of the game
	// 			var game = games.getGame(hostId); //Gets game data with hostId
	// 			var pin = game.pin; //Gets the pin of the game

	// 			if (game.gameLive == false) {
	// 				players.removePlayer(socket.id); //Removes player from players class
	// 				var playersInGame = players.getPlayers(hostId); //Gets remaining players in game

	// 				io.to(pin).emit("updatePlayerLobby", playersInGame); //Sends data to host to update screen
	// 				socket.leave(pin); //Player is leaving the room
	// 			}
	// 		}
	// 	}
	// });
});
