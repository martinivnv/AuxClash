import React from "react";

const GameOverScoreboard = ({ players }) => {
	return (
		<div className="ml-20 h-full w-3/4">
			<h2 className="mb-2 text-3xl font-bold">Scoreboard</h2>
			<div
				className="h-full rounded-md py-8 px-8 mix-blend-hard-light"
				style={{ backgroundColor: "#ffffff6e" }}
			>
				<ul>
					{players.map((p, index) => (
						<li key={p.index} className="mb-4">
							<div className="flex flex-row justify-between">
								<div className="text-2xl font-bold text-black">
									{`${index + 1}. ${p.playerName}`}
								</div>
								<div className="text-2xl text-white">{`${p.score}`}</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default GameOverScoreboard;
