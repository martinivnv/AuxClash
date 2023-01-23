import { useState } from "react";
import { Link } from "react-router-dom";
import SpotifyLogin from "../shared/SpotifyLogin";

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
					onChange={(e) => setCode(e.target.value.toUpperCase())}
				/>
				<Link
					to="/player/run"
					state={{ lobbyCode: code, playerName: playerName }}
				>
					Join a Lobby
				</Link>
				<p>Or</p>
				<Link to="/host/lobby">Start a Lobby</Link>
				<SpotifyLogin />
			</div>
		</div>
	);
};

export default Home;
