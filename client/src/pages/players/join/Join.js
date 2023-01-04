import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Join = () => {
	const [nickname, setNickname] = useState("");

	return (
		<div>
			<p>Game found!</p>
			<label>Choose a nickname: </label>
			<input
				type="text"
				value={nickname}
				onChange={(e) => setNickname(e.target.value)}
			/>
			<Link to="/wait">Join Game</Link>
		</div>
	);
};

export default Join;
