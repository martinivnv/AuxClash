import { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
	const [playerName, setPlayerName] = useState("");

	return (
		<div>
			<p>Game found!</p>
			<label>Choose a playerName: </label>
			<input
				type="text"
				value={playerName}
				onChange={(e) => setPlayerName(e.target.value)}
			/>
			<Link to="/player/game">Join Game</Link>
		</div>
	);
};

export default Join;
