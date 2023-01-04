// Import classes
const { LiveGames } = require("./utils/liveGames");
const { Players } = require("./utils/players");

// Import dependencies
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socketIO = require("socket.io");

// Boilerplate setup
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(process.env.PORT);
console.log(process.env.CORS_ORIGIN);

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
var games = new LiveGames();
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
	socket.on("host-joins", (data) => {
		console.log(data);
	});
});
