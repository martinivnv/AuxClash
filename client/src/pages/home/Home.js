import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyLogin from "../../shared/SpotifyLogin";
import axios from "axios";
import "../../css/global.css";
import mainLogo from "../../resources/white logo large.png";
import Footer from "../../shared/Footer";
import HelpModal from "./HelpModal";

const Home = () => {
	const [code, setCode] = useState("");
	const [playerName, setPlayerName] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);

	return (
		<div className="flex h-screen flex-col items-center ">
			<div className="flex w-full">
				<button
					onClick={() => setIsOpen(true)}
					className="m-4 bg-neutral-400 py-2 px-4 text-2xl font-bold mix-blend-hard-light"
				>
					ⓘ
				</button>
			</div>
			<HelpModal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} />
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
						maxLength={10}
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

				<p className="invisible my-4 sm:visible">~ Or ~</p>
				<SpotifyLogin buttonText={"Start a Lobby *"} />
				<div className="mt-3 flex justify-center">
					<p className="invisible w-3/4 text-sm sm:visible">
						* Starting a lobby requires a Spotify login, joining one doesn't.
					</p>
				</div>

				<Footer showPrivacyPolicy={true} />
			</div>
		</div>
	);
};

export default Home;
