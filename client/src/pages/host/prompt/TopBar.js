import { useState } from "react";
import CountdownTimer from "../../../shared/CountdownTimer";

const TopBar = ({ seconds, onCountdownComplete }) => {
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
