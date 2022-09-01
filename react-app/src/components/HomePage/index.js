import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
function HomePage() {
	const [subs, setSubs] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/r/list-all`);
			const subredditInfo = await response.json();
			setSubs(subredditInfo);
		})();
	}, []);
	return (
		<div className="home-sub-list">
			{subs.length > 0 &&
				subs.map((sub) => {
					return <Link to={`/r/${sub.name}`}>r/{sub.name}</Link>;
				})}
		</div>
	);
}

export default HomePage;
