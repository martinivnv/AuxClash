import { useEffect } from "react";
import { useLocation } from "react-router";
import socketIOClient from "socket.io-client";

import Answer from "./answer/Answer";
import Vote from "./vote/Vote";
import Wait from "./wait/Wait";

const PlayerGame = () => {
	const location = useLocation();
	const lobbyCode = location.state.lobbyCode;
	const playerName = location.state.playerName;

	useEffect(() => {
		const socket = socketIOClient("http://localhost:5000/");
		console.log(socket);
		socket.on("connect", () => {
			console.log("Connected to the server");
			// Lets server know this is a player connection
			socket.emit("player-join", "Player joined!");
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return <div>Player game screen</div>;
};

export default PlayerGame;
