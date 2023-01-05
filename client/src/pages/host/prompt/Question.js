const Question = ({ question }) => {
	return (
		<div className="flex flex-col">
			<div>{question.question}</div>
			{question.image !== null && <div>{question.image}</div>}
		</div>
	);
};

export default Question;
