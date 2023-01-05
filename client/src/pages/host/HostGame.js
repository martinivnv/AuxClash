import { useEffect, useState } from "react";
import Prompt from "./prompt/Prompt";
import PlaySubmissions from "./playSubmissions/PlaySubmissions";
import socketIOClient from "socket.io-client";
import { useParams, useNavigate, useLocation } from "react-router";

const HostGame = () => {
	const navigate = useNavigate();
	const params = useParams();
	const lobbyCode = params.lobbyCode;
	const [players, setPlayers] = useState([]);
	const [questions, setQuestions] = useState([{ question: "", image: null }]);
	const [round, setRound] = useState(0);
	const [gameStage, setGameStage] = useState(0);
	const [submissions, setSubmissions] = useState([]);
	const [currentSocket, setCurrentSocket] = useState(null);

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_SERVER);
		setCurrentSocket(socket);
		socket.on("connect", () => {
			console.log("Connected to the server");
			socket.emit("host-join-game", { lobbyCode: lobbyCode });
		});

		socket.on("game-questions", async (data) => {
			await setQuestions(data);
			console.log("questions received");
			setRound(1);
			setGameStage(1);
		});

		socket.on("no-game-found", () => {
			navigate("/");
		});

		//socket.on("player-submission");

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const stageReducer = (action) => {
		/*
			0 - Loading
			1 - Prompt
			2 - Playing submissions
			3 - Vote
			4 - Scoreboard
			5 - Game Finished
		*/
		switch (action) {
			case "PromptCountdownComplete":
				setGameStage(2);
				break;
			default:
				break;
		}
		currentSocket.emit("game-stage-change", gameStage);
	};

	const onPromptCountdownComplete = () => {
		stageReducer("PromptCountdownComplete");
	};

	return (
		<div>
			{gameStage === 1 && (
				<Prompt
					question={questions[round - 1]}
					onCountdownComplete={onPromptCountdownComplete}
				/>
			)}
			{gameStage === 2 && <div>Game stage 2</div>}
		</div>
	);
};

export default HostGame;
