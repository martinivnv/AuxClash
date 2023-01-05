import React, { useState } from "react";
import Searchbar from "./Searchbar";
import axios from "axios";

const Answer = ({ onAnswerSubmitted }) => {
	const [song, setSong] = useState(null);

	const onSearch = (e, query) => {
		e.preventDefault();
		searchYoutube(query);
	};

	const searchYoutube = async (query) => {
		try {
			const response = await axios.get(
				"https://youtube.googleapis.com/youtube/v3/search",
				{
					params: {
						key: process.env.REACT_APP_YOUTUBE_API_KEY,
						part: "snippet",
						maxResults: 1,
						q: query,
					},
				}
			);
			setSong(response.data.items[0]);
			onAnswerSubmitted({
				songTitle: song.snippet.title,
				songId: song.id.videoId,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			{song ? (
				`You submitted ${song.snippet.title}!`
			) : (
				<Searchbar onSearch={onSearch} />
			)}
		</div>
	);
};

export default Answer;
