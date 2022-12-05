import { Link } from "react-router-dom";
import React from 'react'
//Subreddit moderator card
function SubredditInfoModerator({ sub }) {
	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-moderator">
					<Link to={`/user/${sub.owner.username}/submitted`}>
						<div className="moderator-name">{sub.owner.username}</div>
					</Link>
				</div>
			)}
		</>
	);
}

export default SubredditInfoModerator;
