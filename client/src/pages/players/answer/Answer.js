import React, { useState } from "react";

const Answer = ({ onAnswerSubmitted }) => {
	const [submitted, setSubmitted] = useState(false);
	const [query, setQuery] = useState("");

	const onSubmit = () => {
		if (query.trim() !== "") {
			onAnswerSubmitted({
				query: query,
			});
			setSubmitted(true);
		}
	};

	return (
		<div className="flex items-center justify-center">
			{submitted ? (
				<div className="absolute top-1/3 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/3 transform rounded-lg bg-neutral-400 py-4 px-8 mix-blend-hard-light">
					<p className="text-4xl font-bold">Answer submitted!</p>
				</div>
			) : (
				<div className="flex w-10/12 flex-col items-center justify-center">
					<input
						type="text"
						placeholder="Enter your answer..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="h-12 w-full"
					/>
					<button onClick={onSubmit} className="mt-4 w-full">
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default Answer;
