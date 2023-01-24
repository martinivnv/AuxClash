import { useEffect, useState } from "react";

import Players from "./Players";
import Question from "./Question";
import CountdownTimer from "../../../shared/CountdownTimer";

const Prompt = ({ questions, onCountdownComplete, round }) => {
	const [questionNumber, setQuestionNumber] = useState(0);

	useEffect(() => {
		if (round === 0) {
			setQuestionNumber(0);
		} else {
			setQuestionNumber(round - 1);
		}
	}, [round]);

	return (
		<div className="flex h-screen flex-col">
			<CountdownTimer seconds={1000} onComplete={onCountdownComplete} />
			<div className="basis-11/12">
				<div className="flex min-h-full flex-col items-center justify-around text-center">
					<div className="basis-3/4">
						<Question question={questions[questionNumber]} />
					</div>
					<div className="basis-1/4">
						<Players />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Prompt;
