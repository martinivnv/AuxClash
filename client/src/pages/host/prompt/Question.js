const Question = ({ question }) => {
	return (
		<div className="flex flex-col opacity-80">
			<p className="text-2xl font-bold">{question}</p>
			{/* {question.image !== null && <div>{question.image}</div>} */}
		</div>
	);
};

export default Question;
