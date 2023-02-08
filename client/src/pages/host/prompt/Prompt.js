import { useEffect, useState } from "react";

import Question from "./Question";
import CountdownTimer from "../../../shared/CountdownTimer";
import TVContainer from "../../../shared/TVContainer";

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
			<CountdownTimer seconds={90} onComplete={onCountdownComplete} />
			<div className="flex min-h-full flex-col items-center justify-between text-center">
				<div className="flex basis-3/4 flex-col items-center justify-start text-center">
					<TVContainer>
						<Question question={questions[questionNumber]} />
					</TVContainer>
				</div>
			</div>
		</div>
	);
};

export default Prompt;
