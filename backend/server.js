// Import classes
const { LiveGames } = require("./utils/liveGames");
const { Players } = require("./utils/players");

// Import dependencies
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketIO = require("socket.io");

// Boilerplate setup
dotenv.config({ path: ".env" });
const app = express();

app.use(cors());

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = socketIO(server);

// Initialize classes
var games = new LiveGames();
var players = new Players();

// MongoDB setup
const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Connection to MongoDB established successfully.");
});

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

io.on("connection", (socket) => {});
