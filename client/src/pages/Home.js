import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyLogin from "../shared/SpotifyLogin";
import axios from "axios";
import "../css/global.css";
import mainLogo from "../resources/white logo large.png";
import Footer from "../shared/Footer";

const Home = () => {
	const [code, setCode] = useState("");
	const [playerName, setPlayerName] = useState("");

	return (
		<div className="flex h-screen flex-col items-center ">
			<div className="h-16"></div>
			<img
				src={mainLogo}
				alt="auxClashLogo"
				className="w-9/12 mix-blend-hard-light sm:w-4/12"
			/>
			<div>
				<div className="flex flex-col items-center max-sm:space-y-4 sm:flex-row sm:space-x-4">
					<input
						type="text"
						placeholder="Enter your name..."
						value={playerName}
						onChange={(e) => setPlayerName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Enter Lobby Code..."
						value={code}
						onChange={(e) => setCode(e.target.value.toUpperCase())}
					/>
					<Link
						className="link"
						to="/player/run"
						state={{ lobbyCode: code, playerName: playerName }}
						onClick={(e) => {
							if (playerName.trim() === "" || code.trim() === "") {
								e.preventDefault();
							}
						}}
					>
						Join a Lobby
					</Link>
				</div>

				<p className="my-4">~ Or ~</p>
				<SpotifyLogin buttonText={"Start a Lobby *"} />
				<div className="mt-3 flex justify-center">
					<p className="w-3/4 text-sm">
						* Starting a lobby requires a Spotify login, joining one doesn't.
					</p>
				</div>

				<Footer showPrivacyPolicy={true} />
			</div>
		</div>
	);
};

export default Home;
