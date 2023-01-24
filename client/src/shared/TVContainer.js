import tv from "../resources/crt_tv.png";

const TVContainer = ({ children }) => {
	return (
		<div className="w-6/12">
			<img
				src={tv}
				alt="crtTV"
				className="relative z-0 w-full mix-blend-difference"
			/>
			<div className="relative bottom-1/2 w-8/12 pl-20">{children}</div>
		</div>
	);
};

export default TVContainer;
