import { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

const CountdownTimer = ({
	seconds,
	onComplete,
	completeCountdownText = "Skip",
}) => {
	const [startTime, setStartTime] = useState(Date.now());

	const renderer = ({ hours, minutes, seconds, completed }) => {
		return (
			<span>
				{zeroPad(minutes)}:{zeroPad(seconds)}
			</span>
		);
	};

	return (
		<div className="absolute top-0 right-0 flex flex-col p-16 text-center text-4xl font-bold">
			<Countdown
				date={startTime + seconds * 1000}
				onComplete={onComplete}
				daysInHours={true}
				renderer={renderer}
				className="w-32"
			/>
			<button className="mt-4 w-32 py-4" onClick={onComplete}>
				{completeCountdownText}
			</button>
		</div>
	);
};

export default CountdownTimer;
