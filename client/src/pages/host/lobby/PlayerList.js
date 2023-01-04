import React from "react";

const PlayerList = ({ players }) => {
	return (
		<ul>
			{players.map((p) => (
				<li key={p.playerId}>{p.playerName}</li>
			))}
		</ul>
	);
};

export default PlayerList;
