import tv from "../resources/crt_tv.png";

const TVContainer = ({ children }) => {
	return (
		<div className="w-6/12">
			<img
				src={tv}
				alt="crtTV"
				className="z-2 relative mix-blend-difference"
				width="1300"
			/>
			<div className="relative bottom-1/2 w-8/12 pl-16">{children}</div>
		</div>
	);
};

export default TVContainer;
