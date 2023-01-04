import { Link } from "react-router-dom";

const Home = () => {
	const onJoinGameClick = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			<h1>Welcome to Aux War</h1>
			<div>
				<form onSubmit={onJoinGameClick}>
					<input type="text" placeholder="Enter Lobby Code..." />
					<button type="submit">Join a Game</button>
				</form>
				<p>Or</p>
				<Link to="/lobby">Start a Game</Link>
			</div>
		</div>
	);
};

export default Home;
