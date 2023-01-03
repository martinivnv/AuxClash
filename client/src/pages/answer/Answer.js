import React from "react";
import Searchbar from "./Searchbar";

const Answer = () => {
	const onSearch = (e, query) => {
		e.preventDefault();
		console.log("form submitted ✅");
		console.log(query);
	};

	return (
		<div>
			<Searchbar onSearch={onSearch} />
		</div>
	);
};

export default Answer;
