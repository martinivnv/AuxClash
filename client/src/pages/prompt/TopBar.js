import { useState } from "react";
import CountdownTimer from "../../shared/CountdownTimer";

const TopBar = () => {
	const [isCountdownDone, setIsCountdownDone] = useState(false);
	const [seconds, setSeconds] = useState(90);

	const onCountdownComplete = () => {
		setIsCountdownDone(true);
	};

	return (
		<div className="flex min-h-full flex-row items-center justify-between text-center">
			<div className="basis-1/6">
				<CountdownTimer seconds={seconds} onComplete={onCountdownComplete} />
			</div>
			<div className="basis-1/6">Party Code</div>
		</div>
	);
};

export default TopBar;
