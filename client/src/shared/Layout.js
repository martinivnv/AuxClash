import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Lobby from "../pages/host/lobby/Lobby";
import HostGame from "../pages/host/HostGame";
import PlayerGame from "../pages/players/PlayerGame";
import LoginCallback from "../pages/host/auth/LoginCallback";

const Layout = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/callback" element={<LoginCallback />}></Route>
			<Route path="/host/lobby" element={<Lobby />}></Route>
			<Route path="/host/run/:lobbyCode" element={<HostGame />}></Route>
			<Route path="/player/run" element={<PlayerGame />}></Route>
		</Routes>
	);
};

export default Layout;
