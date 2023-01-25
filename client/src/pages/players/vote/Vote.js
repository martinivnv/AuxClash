import { useState } from "react";

const VoteButton = ({ songTitle, songArtist, onClickFunction }) => {
	return (
		<button
			onClick={onClickFunction}
			className="mb-4 h-20 w-8/12"
		>{`${songArtist} - ${songTitle}`}</button>
	);
};

const Vote = ({ submissions, onVoteSubmitted }) => {
	const [voteSubmitted, setVoteSubmitted] = useState(false);

	const onClickFunction = (songId, songTitle) => {
		onVoteSubmitted(songId, songTitle);
		setVoteSubmitted(true);
	};

	return (
		<div>
			<p className="mb-6 text-3xl font-bold">Vote for the best pick!</p>
			{!voteSubmitted ? (
				<ul>
					{submissions.map((s) => (
						<li key={s.songId}>
							<VoteButton
								songTitle={s.songTitle}
								songArtist={s.songArtist}
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
