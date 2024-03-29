import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import GameContainer from "../../../shared/GameContainer";

const LoginCallback = () => {
	let search = window.location.search;
	let params = new URLSearchParams(search);
	let code = params.get("code");
	const navigate = useNavigate();

	useEffect(() => {
		handleCallback(code);
	}, []);

	const handleCallback = async (code) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/callback?code=${code}`
			);
			await window.localStorage.setItem("access_token", data.access_token);
			navigate("/host/lobby");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<GameContainer>
			<h3>Logged in!</h3>
			<p>Redirecting to lobby...</p>
		</GameContainer>
	);
};

export default LoginCallback;
