import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import socketIOClient from "socket.io-client";

import Answer from "./answer/Answer";
import Vote from "./vote/Vote";
import Wait from "./wait/Wait";

const PlayerGame = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const lobbyCode = location.state.lobbyCode;
	const playerName = location.state.playerName;
	const [gameStage, setGameStage] = useState(0);
	const [currentSocket, setCurrentSocket] = useState(null);

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_SERVER);
		setCurrentSocket(socket);
		socket.on("connect", () => {
			console.log("Connected to the server");
			// Lets server know this is a player connection
			socket.emit("player-join", {
				lobbyCode: lobbyCode,
				playerName: playerName,
			});
		});

		socket.on("update-players-on-stage-change", (newStage) => {
			setGameStage(newStage);
		});

		socket.on("no-game-found", () => {
			navigate("/");
		});

		socket.on("host-disconnect", () => {
			navigate("/");
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const onAnswerSubmitted = (data) => {
		currentSocket.emit("answer-submitted", {
			playerId: currentSocket.id,
			lobbyCode: lobbyCode,
			songTitle: data.songTitle,
			songId: data.songId,
		});
	};

	return (
		<div>
			<div>{gameStage}</div>
			{gameStage === 0 && <Wait />}
			{gameStage === 1 && <Answer onAnswerSubmitted={onAnswerSubmitted} />}
			{gameStage === 2 && <Wait />}
		</div>
	);
};

export default PlayerGame;
