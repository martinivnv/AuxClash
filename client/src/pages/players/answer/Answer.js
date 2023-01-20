import React, { useState } from "react";
import Searchbar from "./Searchbar";

const Answer = ({ onAnswerSubmitted }) => {
	const [submitted, setSubmitted] = useState(false);

	const onSearch = (e, query) => {
		e.preventDefault();
		onAnswerSubmitted({
			query: query,
		});
		setSubmitted(true);
	};

	return (
		<div>
			{submitted ? `Answer submitted!` : <Searchbar onSearch={onSearch} />}
		</div>
	);
};

export default Answer;
