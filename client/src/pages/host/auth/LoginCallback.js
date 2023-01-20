import { useEffect, useState } from "react";
import axios from "axios";

const LoginCallback = () => {
	const [accessToken, setAccessToken] = useState("");
	let search = window.location.search;
	let params = new URLSearchParams(search);
	let code = params.get("code");

	useEffect(() => {
		console.log("Calling handleCallback");
		handleCallback(code);
	}, []);

	const handleCallback = async (code) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/callback?code=${code}`
			);
			localStorage.setItem("access_token", data.access_token);
			setAccessToken(data.access_token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			Logged in!
			<div>{accessToken}</div>
		</div>
	);
};

export default LoginCallback;
