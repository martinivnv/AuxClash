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
			const oldScore = matchingPlayer.score;
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
			return 1;
		}
		if (a.numVotes < b.numVotes) {
			return -1;
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
		<div className="absolute top-1/3 left-1/2 w-2/5 -translate-x-1/2 -translate-y-1/3">
			<h2 className="mb-2 text-4xl font-bold">Scoreboard</h2>
			<div
				className="rounded-md py-8 px-8 mix-blend-hard-light"
				style={{ backgroundColor: "#ffffff6e" }}
			>
				<ul>
					{consolidatedVotes.map((s) => (
						<li key={s.songId} className="mb-4">
							<div className="text-2xl font-bold text-black">{`${s.songTitle} --- ${s.numVotes} Votes`}</div>
							<div className="text-xl">{`${s.playerName} --- ${s.oldScore} -> ${s.playerScore}`}</div>
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
