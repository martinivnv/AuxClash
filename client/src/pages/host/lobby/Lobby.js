import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

import PlayerList from "./PlayerList";

const Lobby = () => {
	const [players, setPlayers] = useState(["player1", "player2"]);
	const [lobbyCode, setLobbyCode] = useState("...");

	useEffect(() => {
		const socket = socketIOClient("http://localhost:5000/");
		socket.on("connect", () => {
			console.log("Connected to the server");
			// Lets server know this is a host connection
			socket.emit("host-join", "Host joined!");
		});

		socket.on("show-lobby-code", (data) => {
			setLobbyCode(data.lobbyCode);
		});

		socket.on("update-player-lobby", (data) => {
			setPlayers(data);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			<div>
				<h3>Head to auxwar.com and enter the code below to join:</h3>
				<p>{lobbyCode}</p>
				<br />
				<Link to="/host/game">Begin the Game</Link>
			</div>
			<div>
				<h3>Aux Warriors:</h3>
				<PlayerList players={players} />
			</div>
		</div>
	);
};

export default Lobby;
