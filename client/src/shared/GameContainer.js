import { Link } from "react-router-dom";
import mainLogo from "../resources/white logo large.png";
import Footer from "./Footer";

const GameContainer = ({
	children,
	showFooter = false,
	showPrivacyPolicy = false,
}) => {
	return (
		<div>
			<div className="w-1/2 sm:w-1/6">
				<Link to="/">
					<img
						src={mainLogo}
						alt="auxClashLogo"
						className="p-4 mix-blend-hard-light "
					/>
				</Link>
			</div>
			{children}
			{showFooter && <Footer showPrivacyPolicy={showPrivacyPolicy} />}
		</div>
	);
};

export default GameContainer;
