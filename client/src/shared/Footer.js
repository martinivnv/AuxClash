import footerLogo from "../resources/martinivnv-logo-seethru.png";
import spotifyLogo from "../resources/Spotify_Logo_RGB_White.png";
import PrivacyPolicy from "../resources/Aux-Clash-Privacy-Policy-2023.pdf";

const Footer = ({ showPrivacyPolicy }) => {
	const onPrivacyPolicyClick = () => {
		window.open(PrivacyPolicy);
	};

	return (
		<div className="absolute inset-x-0 bottom-0 flex flex-col justify-between px-8 py-4 text-base sm:flex-row">
			<div className="invisible flex items-center justify-center sm:visible">
				<a href="https://martinivnv.com/" target="_blank" rel="noreferrer">
					<img
						src={footerLogo}
						alt="Logo"
						width="33px"
						height="33px"
						className="mr-2"
					/>
				</a>
				<div>© 2023 Martin Ivanov</div>
			</div>
			<div>
				{showPrivacyPolicy && (
					<button
						onClick={onPrivacyPolicyClick}
						className="invisible cursor-pointer bg-transparent p-0 text-base font-normal underline sm:visible"
					>
						Privacy Policy
					</button>
				)}
			</div>
			<div className="flex items-center justify-center">
				<span> Powered by </span>
				<img src={spotifyLogo} alt="Logo" width="110px" className="ml-2" />
			</div>
		</div>
	);
};

export default Footer;
