import { BrowserRouter } from "react-router-dom";
import Layout from "./shared/Layout";
import MainContainer from "./shared/MainContainer";

function App() {
	return (
		<BrowserRouter>
			<MainContainer>
				<Layout />
			</MainContainer>
		</BrowserRouter>
	);
}

export default App;
