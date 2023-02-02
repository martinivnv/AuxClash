import { useNavigate } from "react-router";
import GameOverScoreboard from "./GameOverScoreboard";

const GameOver = ({ players }) => {
	const navigate = useNavigate();

	return (
		<div>
			<div className="mb-16 flex flex-row" style={{ height: "30rem" }}>
				<div className="m-auto w-1/2">
					<div>
						<span className="text-3xl font-bold">Thank you for playing!</span>
					</div>
				</div>
				<div className="w-1/2">
					<GameOverScoreboard players={players} />
				</div>
			</div>
			<button onClick={() => navigate("/")}>Return Home</button>
		</div>
	);
};

export default GameOver;
