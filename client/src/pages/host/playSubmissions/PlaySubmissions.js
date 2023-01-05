import React, { useState } from "react";
import YouTube from "react-youtube";

const PlaySubmissions = ({ submissions }) => {
	const [showVideo, setShowVideo] = useState(false);
	const [queueFinished, setQueueFinished] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	let videoTarget = null;

	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			modestbranding: 1,
			controls: 0,
		},
	};

	const onReady = (event) => {
		videoTarget = event.target;
	};

	const playNext = () => {
		if (!showVideo) {
			setShowVideo(true);
		}
		if (currentSong < submissions.length - 1 || currentSong === 0) {
			videoTarget.loadVideoById(submissions[currentSong].songId, 0);
		} else {
			setQueueFinished(true);
			setShowVideo(false);
		}
		setCurrentSong((currentSong) => currentSong + 1);
	};

	return (
		<div>
			{!queueFinished ? <button onClick={playNext}>Play next</button> : null}
			<div className="aspect-video">
				{showVideo ? (
					<YouTube
						videoId={submissions[currentSong].songId}
						opts={opts}
						onReady={onReady}
					/>
				) : null}
			</div>
		</div>
	);
};

export default PlaySubmissions;
