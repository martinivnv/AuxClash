const Home = () => {
	return (
		<div>
			<h1>Welcome to Aux War</h1>
			<div>
				<form>
					<input type="text" placeholder="Enter Lobby Code..." />
					<button type="submit">Join a Game</button>
				</form>
				<p>Or</p>
				<button>Start a Game</button>
			</div>
		</div>
	);
};

export default Home;
