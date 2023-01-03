const Prompt = () => {
	return (
		<div className="flex h-screen flex-col">
			<div className="basis-1/12">
				<div className="flex min-h-full flex-row items-center justify-between text-center">
					<div className="basis-1/6">Clock</div>
					<div className="basis-1/6">Party Code</div>
				</div>
			</div>
			<div className="basis-11/12">
				<div className="flex min-h-full flex-col items-center justify-around text-center">
					<div className="basis-3/4">
						<div>Question</div>
						<div>Image</div>
					</div>
					<div className="basis-1/4">Players</div>
				</div>
			</div>
		</div>
	);
};

export default Prompt;
