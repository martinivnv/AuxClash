import React, { useState } from "react";

const SpotifyLogin = () => {
	const [authorizationUrl, setAuthorizationUrl] = useState(null);

	const handleClick = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/spotify-login`
			);
			console.log(response);
			const data = await response.json();
			console.log(data);
			setAuthorizationUrl(data.authorizationUrl);
		} catch (e) {
			console.error(e);
		}
	};

	if (authorizationUrl) {
		window.location.href = authorizationUrl;
		return null;
	}

	return <button onClick={handleClick}>Login with Spotify</button>;
};

export default SpotifyLogin;
