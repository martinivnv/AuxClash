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
			<img src={mainLogo} alt="auxClashLogo" width="400" />
			<div>
				<div className="flex items-center space-x-4">
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
					>
						Join a Lobby
					</Link>
				</div>

				<p className="my-4">Or</p>
				<Link to="/host/lobby" className="link">
					Start a Lobby
				</Link>
			</div>
		</div>
	);
};

export default Home;
