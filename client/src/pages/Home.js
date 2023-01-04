import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [code, setCode] = useState("");
	const [nickname, setNickname] = useState("");

	return (
		<div>
			<h1>Welcome to Aux War</h1>
			<div>
				<input
					type="text"
					placeholder="Enter your name..."
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Enter Lobby Code..."
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
				<Link
					to="/player/game"
					state={{ lobbyCode: code, playerName: nickname }}
				>
					Join a Game
				</Link>
				<p>Or</p>
				<Link to="/host/lobby">Start a Game</Link>
			</div>
		</div>
	);
};

export default Home;
