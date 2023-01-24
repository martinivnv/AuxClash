import React from "react";

const PlayerList = ({ players }) => {
	return (
		<div className="m-4 flex h-full items-center justify-center rounded border">
			{players.length > 0 ? (
				<ul className="columns-3">
					{players.map((p) => (
						<li key={p.playerId} className="text-2xl font-bold">
							{p.playerName}
						</li>
					))}
				</ul>
			) : (
				<p>Waiting...</p>
			)}
		</div>
	);
};

export default PlayerList;
