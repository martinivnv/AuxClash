import React, { useEffect, useState } from "react";
import SpotifyPlayer from "./SpotifyPlayer";

const PlaySubmissions = ({ submissions, onQueueFinished }) => {
	const [queueFinished, setQueueFinished] = useState(false);
	const [currentSong, setCurrentSong] = useState(-1);
	const [showPlayer, setShowPlayer] = useState(false);

	const submissionsHardCoded = [
		{
			artist: "Red Hot Chili Peppers",
			songName: "Under the Bridge",
			songId: "3d9DChrdc6BOeFsbrZ3Is0",
			playerId: "nnAhP1E1a4haiZAdAAAF",
		},
		{
			artist: "Beach House",
			songName: "Space Song",
			songId: "7H0ya83CMmgFcOhw0UB6ow",
			playerId: "kX3oGEVziKgmqGmdAAAI",
		},
	];

	useEffect(() => {
		if (queueFinished) {
			onQueueFinished();
		}
	}, [queueFinished]);

	const playNext = () => {
		if (!showPlayer) {
			setShowPlayer(true);
		}
		if (currentSong < submissionsHardCoded.length - 1) {
			setCurrentSong((currentSong) => currentSong + 1);
		} else {
			setQueueFinished(true);
			setShowPlayer(false);
		}
	};

	return (
		<div>
			{!queueFinished ? <button onClick={playNext}>Play next</button> : null}
			<div>
				{showPlayer && (
					<SpotifyPlayer trackId={submissionsHardCoded[currentSong].songId} />
				)}
			</div>
		</div>
	);
};

export default PlaySubmissions;
