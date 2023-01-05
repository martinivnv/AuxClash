import { useEffect } from "react";

const Vote = ({ submissions }) => {
	return (
		<div>
			<p>Vote for the best pick!</p>
			<ul>
				{submissions.map((s) => (
					<li key={s.songId}>{s.songTitle}</li>
				))}
			</ul>
		</div>
	);
};

export default Vote;
