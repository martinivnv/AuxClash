import React, { useEffect, useState } from "react";
import SpotifyPlayer from "./SpotifyPlayer";

const PlaySubmissions = ({ submissions, onQueueFinished }) => {
	const [queueFinished, setQueueFinished] = useState(false);
	const [currentSong, setCurrentSong] = useState(-1);
	const [showPlayer, setShowPlayer] = useState(false);

	useEffect(() => {
		if (queueFinished) {
			onQueueFinished();
		}
	}, [queueFinished]);

	const playNext = () => {
		if (!showPlayer) {
			setShowPlayer(true);
		}
		if (currentSong < submissions.length - 1) {
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
					<SpotifyPlayer trackId={submissions[currentSong].songId} />
				)}
			</div>
		</div>
	);
};

export default PlaySubmissions;
