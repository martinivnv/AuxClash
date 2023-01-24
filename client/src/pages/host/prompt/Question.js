const Question = ({ question }) => {
	return (
		<div className="flex flex-col">
			<p className="text-xl font-bold">{question.question}</p>
			{question.image !== null && <div>{question.image}</div>}
		</div>
	);
};

export default Question;
