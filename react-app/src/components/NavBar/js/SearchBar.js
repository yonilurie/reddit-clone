import React from 'react'
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

//Searches for subreddits, users and posts
function SearchBar() {
	const history = useHistory();
	const search = useLocation().search;
	const s = new URLSearchParams(search).get("s");

	const [query, setQuery] = useState("");

	//Will push user to search page, settign url with user query.
	// The actual fetch request will be made on that page
	const submitSearch = async (e) => {
		// If search is just spaces, return
		if (!e.target.value.trim()) return;
		if (e.key === "Enter" || e.keyCode === 13) {
			history.push(`/search?s=${query}`);
		}
	};
	
	useEffect(() => {
		if (s) setQuery(s);
		else setQuery("");
	}, [s]);

	return (
		<div className="search-bar-container">
			<input
				className="search-bar"
				type="text"
				value={query}
				placeholder="Search Teddir"
				minLength="1"
				onChange={(e) => setQuery(e.target.value)}
				onKeyUp={submitSearch}
			></input>
		</div>
	);
}

export default SearchBar;
