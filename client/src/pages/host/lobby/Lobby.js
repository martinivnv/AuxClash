import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import GameContainer from "../../../shared/GameContainer";

import PlayerList from "./PlayerList";

const Lobby = () => {
	const navigate = useNavigate();
	const [players, setPlayers] = useState([]);
	const [lobbyCode, setLobbyCode] = useState("...");
	const currentLobbyCode = useRef("...");
	const [category, setCategory] = useState("Party");
	const [hostId, setHostId] = useState("");
	const [currentSocket, setCurrentSocket] = useState(null);

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);
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
			navigate(`/host/run/${currentLobbyCode.current}`);
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
		<GameContainer showFooter={true}>
			<div className="flex flex-row pt-16">
				<div className="w-1/2">
					<h3>Head to auxclash.com and enter the code below to join:</h3>
					<p className="m-8 text-4xl font-bold">{lobbyCode}</p>
					<br />
					<button onClick={emitStartGame} disabled={players.length < 3}>
						Begin the Game
					</button>
					<p className="m-8">
						The game can't begin until at least 3 players have joined!
					</p>
				</div>
				<div className="w-1/2">
					<h3>Aux Warriors:</h3>
					<PlayerList players={players} />
				</div>
			</div>
		</GameContainer>
	);
};

export default Lobby;
