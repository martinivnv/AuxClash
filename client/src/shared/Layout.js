import { Routes, Route } from "react-router-dom";
import Answer from "../pages/players/answer/Answer";
import PlaySubmissions from "../pages/host/playSubmissions/PlaySubmissions";
import Prompt from "../pages/host/prompt/Prompt";
import Home from "../pages/Home";
import Lobby from "../pages/host/lobby/Lobby";
import Join from "../pages/players/join/Join";
import Wait from "../pages/players/wait/Wait";

const Layout = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/lobby" element={<Lobby />}></Route>
			<Route path="/prompt" element={<Prompt />}></Route>
			<Route path="/answer" element={<Answer />}></Route>
			<Route path="/play-submissions" element={<PlaySubmissions />}></Route>
			<Route path="/join" element={<Join />}></Route>
			<Route path="/wait" element={<Wait />}></Route>
		</Routes>
	);
};

export default Layout;
