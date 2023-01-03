import React, { useState } from "react";
import YouTube from "react-youtube";

const PlaySubmission = ({ songId }) => {
	const [showVideo, setShowVideo] = useState(false);

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

	const playNext = () => {
		setShowVideo(true);
	};

	return (
		<div>
			<button onClick={playNext}>Play next</button>
			<div className="aspect-video">
				{showVideo ? <YouTube videoId={songId} opts={opts} /> : null}
			</div>
		</div>
	);
};

export default PlaySubmission;
