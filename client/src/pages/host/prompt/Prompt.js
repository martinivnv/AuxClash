import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Players from "./Players";
import Question from "./Question";
import TopBar from "./TopBar";

const Prompt = ({ question, onCountdownComplete }) => {
	return (
		<div className="flex h-screen flex-col">
			<div className="basis-1/12">
				<TopBar seconds={10} onCountdownComplete={onCountdownComplete} />
			</div>

			<div className="basis-11/12">
				<div className="flex min-h-full flex-col items-center justify-around text-center">
					<div className="basis-3/4">
						<Question question={question} />
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
