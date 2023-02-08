import React, { useEffect, useState } from "react";
import SpotifyPlayer from "./SpotifyPlayer";

const PlaySubmissions = ({ submissions, onQueueFinished, question }) => {
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
		<div className="flex min-h-full flex-col items-center justify-around text-center">
			<div className="flex basis-3/4 flex-col items-center justify-start text-center">
				<div
					className="mb-6 font-bold"
					style={{ display: "block", width: "600px" }}
				>
					{question}
				</div>
				{showPlayer && (
					<SpotifyPlayer trackId={submissions[currentSong].songId} />
				)}
			</div>
			<div className="basis-1/4">
				{!queueFinished ? (
					<button onClick={playNext}>
						{currentSong === -1 ? "Play Submissions" : "Play Next"}
					</button>
				) : null}
			</div>
		</div>
	);
};

export default PlaySubmissions;
