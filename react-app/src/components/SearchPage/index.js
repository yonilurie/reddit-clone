import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function SearchPage() {
	const history = useHistory();
	const search = useLocation().search;
	const s = new URLSearchParams(search).get("s");

	const [searchResult, setSearchResult] = useState(null);

	const executeSearch = async (query) => {
		const response = await fetch(`/api/search?s=${query}`);
		const data = await response.json();
		return data;
	};

	useEffect(async () => {
		if (s) {
            const result = await executeSearch(s);
            console.log(result)
			setSearchResult(result);
		}
	}, []);

	return (
		<div>
			<div>Search Page</div>
			<div></div>
			{searchResult &&
				Object.values(searchResult).length > 0 &&
                Object.values(searchResult).map((user) => {
                    console.log(searchResult)
					return <div key={user.username}>{user.username}</div>;
				})}
		</div>
	);
}

export default SearchPage;
