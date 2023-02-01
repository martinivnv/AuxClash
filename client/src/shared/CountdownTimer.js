import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

const CountdownTimer = ({ seconds, onComplete }) => {
	const [startTime, setStartTime] = useState(Date.now());

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			onComplete();
		} else {
			return (
				<span>
					{zeroPad(minutes)}:{zeroPad(seconds)}
				</span>
			);
		}
	};

	return (
		<div className="absolute top-0 right-0 p-16 text-4xl font-bold">
			<Countdown
				date={startTime + seconds * 1000}
				onComplete={onComplete}
				daysInHours={true}
				renderer={renderer}
			/>
		</div>
	);
};

export default CountdownTimer;
