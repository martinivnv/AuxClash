import { useNavigate } from "react-router";

const GameOver = () => {
	const navigate = useNavigate();

	return (
		<div className="absolute top-1/3 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/3 transform rounded-lg bg-neutral-400 py-8 px-8 mix-blend-hard-light">
			<p className="mb-8 text-4xl font-bold">Thanks for playing!</p>
			<button onClick={() => navigate("/")}>Return Home</button>
		</div>
	);
};

export default GameOver;
