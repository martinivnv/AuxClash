import Countdown from "react-countdown";

const CountdownTimer = ({ seconds, onComplete }) => {
	return (
		<div>
			<Countdown date={Date.now() + seconds * 1000} onComplete={onComplete} />
		</div>
	);
};

export default CountdownTimer;
