import Countdown from "react-countdown";

const CountdownTimer = ({ seconds, onComplete }) => {
	return (
		<div>
			<Countdown
				date={Date.now() + seconds * 1000}
				onComplete={onComplete}
				daysInHours={true}
			/>
		</div>
	);
};

export default CountdownTimer;
