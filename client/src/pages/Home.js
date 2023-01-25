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
	const [authorizationUrl, setAuthorizationUrl] = useState(null);

	const onStartLobby = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/spotify-login`
			);
			const data = await response.json();
			setAuthorizationUrl(data.authorizationUrl);
		} catch (e) {
			console.error(e);
		}
	};

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
							if (playerName === "" || code === "") {
								e.preventDefault();
							}
						}}
					>
						Join a Lobby
					</Link>
				</div>

				<p className="my-4">Or</p>
				<SpotifyLogin buttonText={"Start a Lobby"} />
				<Footer />
			</div>
		</div>
	);
};

export default Home;
