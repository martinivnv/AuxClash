import React, { useState, useEffect } from "react";

const SpotifyLogin = ({ buttonText }) => {
	const [authorizationUrl, setAuthorizationUrl] = useState(null);
	const [width, setWidth] = useState(window.innerWidth);
	const isMobile = width < 768;

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const handleClick = async () => {
		if (isMobile) {
			window.alert(
				"You can't host a lobby on a mobile device! Please use a device with a larger screen."
			);
		} else {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_URL}/api/spotify-login`
				);
				const data = await response.json();
				setAuthorizationUrl(data.authorizationUrl);
			} catch (e) {
				console.error(e);
			}
		}
	};

	if (authorizationUrl) {
		window.location.href = authorizationUrl;
		return null;
	}

	return <button onClick={handleClick}>{buttonText}</button>;
};

export default SpotifyLogin;
