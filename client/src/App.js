import { BrowserRouter } from "react-router-dom";
import Layout from "./shared/Layout";
import MainContainer from "./shared/MainContainer";

function App() {
	return (
		<MainContainer>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		</MainContainer>
	);
}

export default App;
