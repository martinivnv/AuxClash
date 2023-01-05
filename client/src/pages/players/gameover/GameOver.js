import { useNavigate } from "react-router";

const GameOver = () => {
	const navigate = useNavigate();

	return (
		<div>
			<p>Thanks for playing!</p>
			<button onClick={() => navigate("/")}>Return Home</button>
		</div>
	);
};

export default GameOver;
