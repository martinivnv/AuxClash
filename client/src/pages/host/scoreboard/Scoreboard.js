import React, { useEffect, useState } from "react";

const Scoreboard = ({
	votes,
	players,
	submissions,
	setPlayers,
	onEndRound,
}) => {
	const [scores, setScores] = useState({});
	const [consolidatedVotes, setConsolidatedVotes] = useState([]);

	useEffect(() => {
		const votesPerSong = countVotes();
		const unsortedVotes = mapVotesToSongsAndPlayers(votesPerSong);
		const sortedVotes = unsortedVotes.sort(compareSongs);
		setConsolidatedVotes(sortedVotes);
	}, []);

	useEffect(() => {
		updatePlayerScores();
	}, [scores]);

	const countVotes = () => {
		return votes.reduce(
			(count, { votedSongId: key }) => (
				(count[key] = (count[key] || 0) + 1), count
			),
			{}
		);
	};

	const mapVotesToSongsAndPlayers = (votesPerSong) => {
		let newScores = {};
		const parsedVotes = submissions.map((s) => {
			const matchingPlayer = players.find((p) => p.playerId === s.playerId);
			const numVotes = votesPerSong[s.songId] || 0;
			const oldScore = matchingPlayer.score ? matchingPlayer.score : 0;
			const newScore = oldScore + 1200 * numVotes;
			newScores[s.playerId] = newScore;
			return {
				songTitle: s.songTitle,
				songArtist: s.songArtist,
				songId: s.songId,
				numVotes: numVotes,
				playerId: s.playerId,
				playerName: matchingPlayer.playerName,
				oldScore: oldScore,
				playerScore: newScore,
			};
		});
		setScores(newScores);
		return parsedVotes;
	};

	const compareSongs = (a, b) => {
		if (a.numVotes > b.numVotes) {
			return -1;
		}
		if (a.numVotes < b.numVotes) {
			return 1;
		}
		return 0;
	};

	const updatePlayerScores = () => {
		const updatedPlayers = players.map((p) => {
			return { ...p, score: scores[p.playerId] };
		});
		setPlayers(updatedPlayers);
	};

	return (
		<div style={{ height: "26rem" }}>
			<h2 className="mb-2 text-3xl font-bold">Scoreboard</h2>
			<div
				className="mx-40 min-h-full rounded-md py-8 px-8 mix-blend-hard-light"
				style={{ backgroundColor: "#ffffff6e" }}
			>
				<ul>
					{consolidatedVotes.map((s, index) => (
						<li key={s.songId} className="mb-4">
							<div className="flex flex-row justify-between">
								<div className="text-xl font-bold text-black">
									{`${index === 0 ? "👑" : "✅"} ${s.songTitle} — ${
										s.numVotes
									} Votes`}
								</div>
								<div className="text-xl text-white">{`${s.playerName} — ${s.oldScore} ➜ ${s.playerScore} pts`}</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<button onClick={onEndRound} className="mt-4 text-2xl">
				End Round
			</button>
		</div>
	);
};

export default Scoreboard;
