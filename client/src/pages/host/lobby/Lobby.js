import { Link } from "react-router-dom";

const Lobby = () => {
	const lobbyCode = "XXXXXX";

	return (
		<div>
			<div>
				<h3>Head to auxwar.com and enter the code below to join:</h3>
				<p>{lobbyCode}</p>
				<br />
				<Link to="/host/game">Begin the Game</Link>
			</div>
			<div>
				<h3>Aux Warriors:</h3>
				<p>Player list</p>
			</div>
		</div>
	);
};

export default Lobby;
