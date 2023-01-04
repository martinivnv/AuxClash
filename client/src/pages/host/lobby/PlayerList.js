import React from "react";

const PlayerList = ({ players }) => {
	return (
		<ul>
			{players.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
};

export default PlayerList;
