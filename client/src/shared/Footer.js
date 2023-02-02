import footerLogo from "../resources/martinivnv-logo.png";

const Footer = ({ showPrivacyPolicy }) => {
	return (
		<div className="absolute inset-x-0 bottom-0 flex flex-col justify-between px-8 py-4 text-base sm:flex-row">
			<div className="flex items-center justify-center">
				<img
					src={footerLogo}
					alt="Logo"
					width="35px"
					height="35px"
					className="mr-2 mix-blend-color-dodge"
				/>
				<div>© 2023 Martin Ivanov</div>
			</div>
			<div>{showPrivacyPolicy && "Privacy Policy"}</div>
		</div>
	);
};

export default Footer;
