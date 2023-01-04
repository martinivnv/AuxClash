import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./shared/Layout";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
