import "./App.css";
import Answer from "./pages/players/answer/Answer";
import PlaySubmissions from "./pages/host/playSubmissions/PlaySubmissions";
import Prompt from "./pages/host/prompt/Prompt";
import Home from "./pages/Home";
import Lobby from "./pages/host/lobby/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/lobby" element={<Lobby />}></Route>
						<Route path="/prompt" element={<Prompt />}></Route>
						<Route path="/answer" element={<Answer />}></Route>
						<Route
							path="/play-submissions"
							element={<PlaySubmissions />}
						></Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
