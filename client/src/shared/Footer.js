import footerLogo from "../resources/martinivnv-logo-seethru.png";
import PrivacyPolicy from "../resources/Aux-Clash-Privacy-Policy-2023.pdf";

const Footer = ({ showPrivacyPolicy }) => {
	const onPrivacyPolicyClick = () => {
		window.open(PrivacyPolicy);
	};

	return (
		<div className="absolute inset-x-0 bottom-0 flex flex-col justify-between px-8 py-4 text-base sm:flex-row">
			<div className="flex items-center justify-center">
				<a href="https://martinivnv.com/" target="_blank" rel="noreferrer">
					<img
						src={footerLogo}
						alt="Logo"
						width="35px"
						height="35px"
						className="mr-2"
					/>
				</a>
				<div>© 2023 Martin Ivanov</div>
			</div>
			<div>
				{showPrivacyPolicy && (
					<button
						onClick={onPrivacyPolicyClick}
						className="cursor-pointer bg-transparent p-0 text-base font-normal underline "
					>
						Privacy Policy
					</button>
				)}
			</div>
		</div>
	);
};

export default Footer;
