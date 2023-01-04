import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Lobby from "../pages/host/lobby/Lobby";
import Join from "../pages/players/join/Join";
import HostGame from "../pages/host/HostGame";
import PlayerGame from "../pages/players/PlayerGame";

const Layout = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/host/lobby" element={<Lobby />}></Route>
			<Route path="/host/game" element={<HostGame />}></Route>
			<Route path="/player/game" element={<PlayerGame />}></Route>
			<Route path="/player/join" element={<Join />}></Route>
		</Routes>
	);
};

export default Layout;
