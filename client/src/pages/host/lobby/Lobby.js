import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

const Lobby = () => {
	const lobbyCode = "XXXXXX";

	useEffect(() => {
		console.log("Lobby useEffect");
		const socket = socketIOClient("http://localhost:5000/");
		console.log(socket);
		socket.on("connect", () => {
			console.log("Connected to the server");
			// Lets server know this is a host connection
			socket.emit("host-join", "Host joined!");
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
				<p>Player list</p>
			</div>
		</div>
	);
};

export default Lobby;
