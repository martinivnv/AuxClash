import { useState } from "react";
import { Link } from "react-router-dom";
import SpotifyLogin from "../shared/SpotifyLogin";
import "../css/global.css";
import mainLogo from "../resources/white logo large.png";

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
							if (playerName === "" || code === "") {
								e.preventDefault();
							}
						}}
					>
						Join a Lobby
					</Link>
				</div>

				<p className="my-4">Or</p>
				<Link to="/host/lobby" className="link">
					Start a Lobby
				</Link>
				<SpotifyLogin />
			</div>
			<div className="absolute inset-x-0 bottom-0 flex flex-col justify-between px-8 py-4 text-base sm:flex-row">
				<div>© 2023 Martin Ivanov</div>
				<div>Privacy Policy | Contact Us</div>
			</div>
		</div>
	);
};

export default Home;
