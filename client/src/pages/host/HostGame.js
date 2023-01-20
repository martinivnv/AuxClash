import { useEffect, useState } from "react";
import Prompt from "./prompt/Prompt";
import PlaySubmissions from "./playSubmissions/PlaySubmissions";
import socketIOClient from "socket.io-client";
import { useParams, useNavigate } from "react-router";
import WaitForVotes from "./waitForVotes/WaitForVotes";
import Scoreboard from "./scoreboard/Scoreboard";
import GameOver from "./gameover/GameOver";

const HostGame = () => {
	const navigate = useNavigate();
	const params = useParams();
	const lobbyCode = params.lobbyCode;
	const [currentSocket, setCurrentSocket] = useState(null);
	const [players, setPlayers] = useState([]);
	const [questions, setQuestions] = useState([{ question: "", image: null }]);
	const [round, setRound] = useState(0);
	const [gameStage, setGameStage] = useState(0);
	const [submissions, setSubmissions] = useState([]);
	const [votes, setVotes] = useState([]);
	const [songs, setSongs] = useState([]);
	const accessToken = localStorage.getItem("access_token");

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);
		setCurrentSocket(socket);
		socket.on("connect", () => {
			console.log("Connected to the server");
			socket.emit("host-join-game", { lobbyCode: lobbyCode });
		});

		socket.on("game-questions", async (data) => {
			await setQuestions(data);
			setRound(1);
		});

		socket.on("update-host-on-connected-players", (connectedPlayers) => {
			setPlayers(connectedPlayers);
		});

		socket.on("no-game-found", () => {
			navigate("/");
		});

		socket.on("update-host-on-player-answer", (data) => {
			setSubmissions((oldSubmissions) => [...oldSubmissions, data]);
		});

		socket.on("update-host-on-vote", (vote) => {
			setVotes((oldVotes) => [...oldVotes, vote]);
		});

		socket.on("songs-found", (data) => {
			setSongs(data.submissions);
			console.log(data.submissions);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (currentSocket !== null) {
			currentSocket.emit("game-stage-change", {
				newStage: gameStage,
				lobbyCode: lobbyCode,
			});
		}
	}, [gameStage]);

	useEffect(() => {
		newRound();
	}, [round]);

	useEffect(() => {
		if (submissions.length === players.length && players.length > 0) {
			stageReducer("SubmissionsDone");
		}
	}, [submissions]);

	useEffect(() => {
		if (votes.length === players.length && players.length > 0) {
			stageReducer("VotingDone");
		}
	}, [votes]);

	useEffect(() => {
		if (gameStage === 5) {
			currentSocket.emit("game-over");
			currentSocket.disconnect();
		}
	}, [gameStage]);

	const newRound = () => {
		console.log(`new round: ${round}`);
		stageReducer("NewRound");
		setSubmissions([]);
		setVotes([]);
		setSongs([]);
	};

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
			case "NewRound":
				setGameStage(1);
				break;
			case "SubmissionsDone":
				setGameStage(2);
				currentSocket.emit("all-combined-submissions", {
					submissions: submissions,
					lobbyCode: lobbyCode,
					hostId: currentSocket.id,
					accessToken: accessToken,
				});
				break;
			case "PromptCountdownComplete":
				setGameStage(2);
				currentSocket.emit("all-combined-submissions", {
					submissions: submissions,
					lobbyCode: lobbyCode,
					hostId: currentSocket.id,
					accessToken: accessToken,
				});
				break;
			case "AllSubmissionsPlayed":
				setGameStage(3);
				break;
			case "VotingDone":
				setGameStage(4);
				break;
			case "EndRound":
				// If current round is same as number of questions, game over
				if (round === questions.length) {
					setGameStage(5);
				} else {
					setRound((currentRound) => currentRound + 1);
				}
				break;
			default:
				break;
		}
	};

	const onPromptCountdownComplete = () => {
		stageReducer("PromptCountdownComplete");
	};

	const onQueueFinished = () => {
		stageReducer("AllSubmissionsPlayed");
	};

	const onEndRound = () => {
		stageReducer("EndRound");
	};

	return (
		<div>
			<div>{gameStage}</div>
			{gameStage === 1 && (
				<Prompt
					questions={questions}
					round={round}
					onCountdownComplete={onPromptCountdownComplete}
				/>
			)}
			{gameStage === 2 && (
				<PlaySubmissions
					submissions={submissions}
					onQueueFinished={onQueueFinished}
				/>
			)}
			{gameStage === 3 && <WaitForVotes />}
			{gameStage === 4 && (
				<Scoreboard
					votes={votes}
					players={players}
					submissions={submissions}
					setPlayers={setPlayers}
					onEndRound={onEndRound}
				/>
			)}
			{gameStage === 5 && <GameOver />}
		</div>
	);
};

export default HostGame;
