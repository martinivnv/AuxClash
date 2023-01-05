import { useEffect, useState } from "react";
import Prompt from "./prompt/Prompt";
import PlaySubmissions from "./playSubmissions/PlaySubmissions";
import socketIOClient from "socket.io-client";
import { useParams, useNavigate, useLocation } from "react-router";

const HostGame = () => {
	const navigate = useNavigate();
	const params = useParams();
	const lobbyCode = params.lobbyCode;
	console.log(params);
	console.log(lobbyCode);
	const [players, setPlayers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [round, setRound] = useState(0);
	const [gameStage, setGameStage] = useState(1);
	const [submissions, setSubmissions] = useState([]);

	const onCountdownComplete = () => [console.log("countdown complete")];

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_SERVER);
		socket.on("connect", () => {
			console.log("Connected to the server");
			socket.emit("host-join-game", { lobbyCode: lobbyCode });
		});

		socket.on("game-questions", (data) => {
			console.log("questions received");
			setQuestions(data);
			setRound(1);
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

	return (
		<div>
			{/* {gameStage === 1 && (
				<Prompt
					question={questions[round - 1]}
					onCountdownComplete={onCountdownComplete}
				/>
			)} */}
		</div>
	);
};

export default HostGame;
