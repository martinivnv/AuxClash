const SpotifyPlayer = ({
	trackId,
	style = {},
	wide = false,
	width = wide ? "100%" : 300,
	height = wide ? "100%" : 380,
	frameBorder = 0,
	allow = "encrypted-media",
	loading = "lazy",
	...props
}) => {
	return (
		<iframe
			title="Spotify Web Player"
			src={`https://open.spotify.com/embed/track/${trackId}?utm_source=oembed`}
			width="500"
			height="400"
			frameBorder={frameBorder}
			allow={allow}
			style={{
				borderRadius: 8,
				...style,
			}}
			loading={loading}
			{...props}
		/>
	);
};

export default SpotifyPlayer;
