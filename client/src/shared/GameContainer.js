import { useNavigate } from "react-router-dom";
import mainLogo from "../resources/white logo large.png";
import Footer from "./Footer";

const GameContainer = ({
	children,
	showFooter = false,
	showPrivacyPolicy = false,
}) => {
	const navigate = useNavigate();

	const onLogoClick = () => {
		const result = window.confirm(
			"You are about to disconnect from the lobby."
		);
		if (result) {
			navigate("/");
		}
	};

	return (
		<div>
			<div className="w-1/2 sm:w-1/6">
				<img
					src={mainLogo}
					alt="auxClashLogo"
					className="cursor-pointer p-4 mix-blend-hard-light"
					onClick={onLogoClick}
				/>
			</div>
			{children}
			{showFooter && <Footer showPrivacyPolicy={showPrivacyPolicy} />}
		</div>
	);
};

export default GameContainer;
