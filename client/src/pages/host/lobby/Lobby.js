const Lobby = () => {
	const lobbyCode = "XXXXXX";

	return (
		<div>
			<div>
				<h3>Head to auxwar.com and enter the code below to join:</h3>
				<p>{lobbyCode}</p>
				<br />
				<button>Begin the Game</button>
			</div>
			<div>
				<h3>Aux Warriors:</h3>
				<p>Player list</p>
			</div>
		</div>
	);
};

export default Lobby;
