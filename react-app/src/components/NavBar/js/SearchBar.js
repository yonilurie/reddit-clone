import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
function SearchBar() {
	const history = useHistory();
	const search = useLocation().search;
	const s = new URLSearchParams(search).get("s");
	const [query, setQuery] = useState("");

	const submitSearch = async (e) => {
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
