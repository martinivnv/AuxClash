import { useNavigate } from "react-router";
import GameOverScoreboard from "./GameOverScoreboard";
import axios from "axios";
import { useState } from "react";

const GameOver = ({ players, allSubmissions }) => {
	const [trackIds, setTrackIds] = useState();
	const [loading, setLoading] = useState(false);
	const [created, setCreated] = useState(false);
	const accessToken = window.localStorage.getItem("access_token");

	const navigate = useNavigate();

	const extractTrackIds = () => {
		let extractedIds = [];

		for (let i = 0; i < allSubmissions.length; i++) {
			extractedIds = extractedIds.concat(
				allSubmissions[i].submissions.map((s) => s.songId)
			);
		}

		console.log(extractedIds);
		setTrackIds(extractedIds);
	};

	const createPlaylist = async () => {
		if (!trackIds) {
			extractTrackIds();
		}
		try {
			setLoading(true);
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/api/create-spotify-playlist`,
				{
					trackIds: trackIds,
					accessToken: accessToken,
				}
			);
			console.log(response.data);
			setCreated(true);
		} catch (e) {
			console.log(e);
		}
		setLoading(false);
	};

	return (
		<div>
			<div className="mb-16 flex flex-row" style={{ height: "30rem" }}>
				<div className="m-auto w-1/2 px-8">
					<div className="my-6">
						<span className="text-3xl font-bold">Thank you for playing!</span>
					</div>
					<div>
						<p className="text-xl">
							Click the button below to save all of the songs from this Aux
							Clash as a Spotify playlist!
						</p>
						{created ? (
							<p className="my-6 text-xl">
								The playlist has been created. Check your Spotify account!
							</p>
						) : loading ? (
							<p className="my-6 text-xl font-bold">Creating playlist...</p>
						) : (
							<button onClick={createPlaylist} className="my-6">
								Create Playlist
							</button>
						)}
					</div>
					<button onClick={() => navigate("/")} className="my-6">
						Return Home
					</button>
				</div>
				<div className="w-1/2">
					<GameOverScoreboard players={players} />
				</div>
			</div>
		</div>
	);
};

export default GameOver;
