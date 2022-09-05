import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
function HomePage() {
	const [subs, setSubs] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/r/list-five`);
			const subredditInfo = await response.json();
			setSubs(subredditInfo);
		})();
	}, []);
	return (
		<div className="home-sub-list">
			<div className="reccomended-title">
				<div>Communities to Check Out</div>
			</div>
			<div className="reccomended-subs-container">
				{subs.length > 0 &&
					subs.map((sub, idx) => {
						return (
							<Link to={`/r/${sub.name}`} key={sub.name}>
								<div className="reccomended-container">
									<div className="reccomended-content">
										<div>{idx + 1}</div>
										<div>r/{sub.name}</div>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
}

export default HomePage;
