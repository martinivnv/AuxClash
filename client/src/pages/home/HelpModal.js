import Modal from "react-modal";

const HelpModal = ({ isOpen, onRequestClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onRequestClose}
			style={{
				content: {
					display: "flex",
					flexDirection: "column",
					fontSize: "medium",
				},
			}}
			appElement={document.getElementById("root") || undefined}
		>
			<button
				onClick={onRequestClose}
				className="absolute top-1 right-1 bg-transparent p-2 text-base text-black"
			>
				X
			</button>
			<h1 className="text-xl font-bold">What is Aux Clash?</h1>
			<p>
				Aux Clash is the easiest way to aux battle with your friends and create
				the ultimate playlist! <br /> <br /> Given a prompt like{" "}
				<span className="italic">"Name a song that gives you goosebumps"</span>,
				everyone has 90 seconds to submit a song. The songs are played, then
				everyone has 90 seconds to vote on the best pick. <br /> <br />
				At the end of 3 rounds, all of the songs are compiled into a playlist
				that can be saved to the host's Spotify and one person is crowned the{" "}
				<span className="font-bold">Aux Champion</span>
				{"! "} <br /> <br />
				<span className="italic text-rose-600">
					Note that Aux Clash works for groups of 3 to 8.
				</span>
			</p>
			<h2 className="mt-6 text-xl font-bold">How does it work?</h2>
			<p>
				Have you ever used Kahoot? Aux Clash works just like that. <br /> <br />
				The host needs to sign in to their{" "}
				<span className="font-bold">Spotify</span> account to start a lobby on a{" "}
				<span className="font-bold">laptop, PC, or tablet.</span> <br /> <br />{" "}
				<span className="italic">
					Note: In order to play submitted songs to their full length, the host
					needs to have Spotify Premium. However, the trial version will still
					work for playing short snippets.
				</span>{" "}
				<br />
				<br /> Everyone else joins on their phones using the lobby code, no
				Spotify account required. Once 3 to 8 friends have joined, the Aux Clash
				can begin.
			</p>
			<br />
			<p>
				Questions?{" "}
				<a
					href="mailto:martinivnv2002@gmail.com"
					className="text-sky-500 underline"
				>
					Contact us!
				</a>
			</p>
		</Modal>
	);
};

export default HelpModal;
