import "./App.css";
import Answer from "./pages/players/answer/Answer";
import PlaySubmissions from "./pages/host/playSubmissions/PlaySubmissions";
import Prompt from "./pages/host/prompt/Prompt";

function App() {
	return (
		<div className="App">
			<PlaySubmissions
				submittedSongs={["NxxjLD2pmlk", "A__cH65WRvE", "HGorCGszxZU"]}
			/>
		</div>
	);
}

export default App;
