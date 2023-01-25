import React, { useState } from "react";

const SpotifyLogin = ({ buttonText }) => {
	const [authorizationUrl, setAuthorizationUrl] = useState(null);

	const handleClick = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/spotify-login`
			);
			const data = await response.json();
			setAuthorizationUrl(data.authorizationUrl);
		} catch (e) {
			console.error(e);
		}
	};

	if (authorizationUrl) {
		window.location.href = authorizationUrl;
		return null;
	}

	return <button onClick={handleClick}>{buttonText}</button>;
};

export default SpotifyLogin;
