import "./App.css";
import Answer from "./pages/players/answer/Answer";
import PlaySubmissions from "./pages/host/playSubmissions/PlaySubmissions";
import Prompt from "./pages/host/prompt/Prompt";
import Home from "./pages/Home";
import Lobby from "./pages/host/lobby/Lobby";

function App() {
	return (
		<div className="App">
			{/* <PlaySubmissions
				submittedSongs={["NxxjLD2pmlk", "A__cH65WRvE", "HGorCGszxZU"]}
			/> */}
			<Lobby />
		</div>
	);
}

export default App;
