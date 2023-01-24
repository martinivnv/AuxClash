import mainLogo from "../resources/white logo large.png";

const GameContainer = ({ children }) => {
	return (
		<div>
			<div className="w-1/2 sm:w-1/6">
				<img
					src={mainLogo}
					alt="auxClashLogo"
					className="p-4 mix-blend-hard-light "
				/>
			</div>
			{children}
		</div>
	);
};

export default GameContainer;
