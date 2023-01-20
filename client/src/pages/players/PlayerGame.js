import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import socketIOClient from "socket.io-client";
import GameOver from "../host/gameover/GameOver";

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
	const [submissions, setSubmissions] = useState([]);
	const [hostId, setHostId] = useState(null);

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);
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

		socket.on("songs-found", ({ hostId, submissions }) => {
			// remove this players submission so they cannot vote for their own
			const filteredSubmissions = submissions.filter(
				(s) => s.playerId !== socket.id
			);
			setSubmissions(filteredSubmissions);
			setHostId(hostId);
			console.log(filteredSubmissions);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (gameStage === 5) {
			currentSocket.disconnect();
		}
	}, [gameStage]);

	const onAnswerSubmitted = (data) => {
		currentSocket.emit("answer-submitted", {
			playerId: currentSocket.id,
			lobbyCode: lobbyCode,
			query: data.query,
		});
	};

	const onVoteSubmitted = (votedSongId, votedSongTitle) => {
		currentSocket.emit("vote-submitted", {
			playerId: currentSocket.id,
			votedSongTitle: votedSongTitle,
			votedSongId: votedSongId,
			hostId: hostId,
		});
	};

	return (
		<div>
			<div>{gameStage}</div>
			{gameStage === 0 && <Wait />}
			{gameStage === 1 && <Answer onAnswerSubmitted={onAnswerSubmitted} />}
			{gameStage === 2 && <Wait />}
			{gameStage === 3 && (
				<Vote submissions={submissions} onVoteSubmitted={onVoteSubmitted} />
			)}
			{gameStage === 4 && <Wait />}
			{gameStage === 5 && <GameOver />}
		</div>
	);
};

export default PlayerGame;
