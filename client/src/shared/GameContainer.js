import mainLogo from "../resources/white logo large.png";
import Footer from "./Footer";

const GameContainer = ({ children, showFooter = false }) => {
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
			{showFooter && <Footer />}
		</div>
	);
};

export default GameContainer;
