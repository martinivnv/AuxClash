import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [code, setCode] = useState("");
	const [playerName, setPlayerName] = useState("");

	return (
		<div>
			<h1>Welcome to Aux Clash</h1>
			<div>
				<input
					type="text"
					placeholder="Enter your name..."
					value={playerName}
					onChange={(e) => setPlayerName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Enter Lobby Code..."
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
				<Link
					to="/player/run"
					state={{ lobbyCode: code.toUpperCase(), playerName: playerName }}
				>
					Join a Lobby
				</Link>
				<p>Or</p>
				<Link to="/host/lobby">Start a Lobby</Link>
			</div>
		</div>
	);
};

export default Home;
