import React, { useEffect, useState } from "react";

const Scoreboard = ({ votes, players, submissions, setPlayers }) => {
	const [scores, setScores] = useState({});
	const [consolidatedVotes, setConsolidatedVotes] = useState([]);

	useEffect(() => {
		const votesPerSong = countVotes();
		setConsolidatedVotes(mapVotesToSongsAndPlayers(votesPerSong));
		updatePlayerScores();
	}, []);

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
			const newScore = matchingPlayer.score + 1200 * numVotes;
			newScores[s.playerId] = newScore;
			return {
				songTitle: s.songTitle,
				songId: s.songId,
				numVotes: numVotes,
				playerId: s.playerId,
				playerName: matchingPlayer.playerName,
				playerScore: newScore,
			};
		});
		setScores(newScores);
		return parsedVotes;
	};

	const updatePlayerScores = () => {
		const updatedPlayers = players.map((p) => p.score === scores[p.playerId]);
		setPlayers(updatedPlayers);
	};

	// const mapVotesToPlayers = (votes, players) => {

	// }

	return (
		<ul>
			{consolidatedVotes.map((s) => (
				<li
					key={s.songId}
				>{`${s.songTitle} --- ${s.numVotes} --- ${s.playerName} --- ${s.playerScore}`}</li>
			))}
		</ul>
	);
};

export default Scoreboard;
