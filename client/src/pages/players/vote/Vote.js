import { useState } from "react";

const VoteButton = ({ songTitle, onClickFunction }) => {
	return <button onClick={onClickFunction}>{songTitle}</button>;
};

const Vote = ({ submissions, onVoteSubmitted }) => {
	const [voteSubmitted, setVoteSubmitted] = useState(false);

	const onClickFunction = (songId, songTitle) => {
		onVoteSubmitted(songId, songTitle);
		setVoteSubmitted(true);
	};

	return (
		<div>
			<p>Vote for the best pick!</p>
			{!voteSubmitted ? (
				<ul>
					{submissions.map((s) => (
						<li key={s.songId}>
							<VoteButton
								songTitle={s.songTitle}
								onClickFunction={() => onClickFunction(s.songId, s.songTitle)}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>Vote submitted!</p>
			)}
		</div>
	);
};

export default Vote;
