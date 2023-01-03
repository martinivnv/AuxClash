import Players from "./Players";
import Question from "./Question";
import TopBar from "./TopBar";

const Prompt = () => {
	return (
		<div className="flex h-screen flex-col">
			<div className="basis-1/12">
				<TopBar />
			</div>

			<div className="basis-11/12">
				<div className="flex min-h-full flex-col items-center justify-around text-center">
					<div className="basis-3/4">
						<Question />
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
