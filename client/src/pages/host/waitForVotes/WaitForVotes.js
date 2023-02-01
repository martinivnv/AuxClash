import CountdownTimer from "../../../shared/CountdownTimer";

const WaitForVotes = ({ onCountdownComplete }) => {
	return (
		<div className="flex h-screen flex-col">
			<CountdownTimer seconds={90} onComplete={onCountdownComplete} />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<span className="text-4xl font-bold">Waiting for votes...</span>
			</div>
		</div>
	);
};

export default WaitForVotes;
