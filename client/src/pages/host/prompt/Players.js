const Players = ({ waitingFor }) => {
	return (
		<div>
			<p>Waiting for:</p>
			<div>
				{waitingFor.map((p) => (
					<span key={p.name}>{p.name}</span>
				))}
			</div>
		</div>
	);
};

export default Players;
