import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

import PlayerList from "./PlayerList";

const Lobby = () => {
	const navigate = useNavigate();
	const [players, setPlayers] = useState(["player1", "player2"]);
	const [lobbyCode, setLobbyCode] = useState("...");
	const currentLobbyCode = useRef("...");
	const [category, setCategory] = useState("Party");
	const [hostId, setHostId] = useState("");
	const [currentSocket, setCurrentSocket] = useState(null);

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_SERVER);
		setCurrentSocket(socket);
		socket.on("connect", () => {
			console.log("Connected to the server");
			// Lets server know this is a host connection
			socket.emit("host-start-lobby", "Host started lobby!");
		});

		socket.on("show-lobby-code", (data) => {
			setLobbyCode(data.lobbyCode);
			setHostId(data.hostId);
			// Don't know why this is necessary but it would not update the lobby code from the initial value in the navigation param without this
			currentLobbyCode.current = data.lobbyCode;
		});

		socket.on("update-player-lobby", (data) => {
			setPlayers(data);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		socket.on("game-started", () => {
			navigate(`/host/game/${currentLobbyCode.current}`);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const emitStartGame = () => {
		currentSocket.emit("host-start-game", {
			category: category,
			hostId: hostId,
		});
	};

	return (
		<div>
			<div>
				<h3>Head to auxwar.com and enter the code below to join:</h3>
				<p>{lobbyCode}</p>
				<br />
				<button onClick={emitStartGame}>Begin the Game</button>
			</div>
			<div>
				<h3>Aux Warriors:</h3>
				<PlayerList players={players} />
			</div>
		</div>
	);
};

export default Lobby;
