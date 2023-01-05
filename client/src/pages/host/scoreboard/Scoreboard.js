import React, { useEffect, useState } from "react";

const Scoreboard = ({ votes, players, submissions }) => {
	const [scores, setScores] = useState([]);
	const [votesPerSong, setVotesPerSong] = useState([]);

	useEffect(() => {
		const talliedVotes = countVotes();
		setVotesPerSong(mapVotesToSongs(talliedVotes));
	}, []);

	const countVotes = () => {
		return votes.reduce(
			(count, { votedSongId: key }) => (
				(count[key] = (count[key] || 0) + 1), count
			),
			{}
		);
	};

	const mapVotesToSongs = (talliedVotes) => {
		return submissions.map((s) => {
			return {
				songTitle: s.songTitle,
				songId: s.songId,
				numVotes: talliedVotes[s.songId] || 0,
				playerId: s.playerId,
			};
		});
	};

	// const mapVotesToPlayers = (votes, players) => {

	// }

	return (
		<ul>
			{votesPerSong.map((song) => (
				<li key={song.songId}>{`${song.songTitle} ----- ${song.numVotes}`}</li>
			))}
		</ul>
	);
};

export default Scoreboard;
