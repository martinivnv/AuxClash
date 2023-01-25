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
			{!voteSubmitted ? (
				<>
					<p className="mb-6 text-3xl font-bold">Vote for the best pick!</p>
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
				</>
			) : (
				<div className="absolute top-1/3 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/3 transform rounded-lg bg-neutral-400 py-4 px-8 mix-blend-hard-light">
					<p className="text-4xl font-bold">Vote submitted!</p>
				</div>
			)}
		</div>
	);
};

export default Vote;
