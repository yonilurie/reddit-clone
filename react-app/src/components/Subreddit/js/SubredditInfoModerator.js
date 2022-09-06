import { Link } from "react-router-dom";
function SubredditInfoModerator({ sub }) {
	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-moderator">
					<Link to={`/user/${sub.owner.username}`}>
						<div className="moderator-name">{sub.owner.username}</div>
					</Link>
				</div>
			)}
		</>
	);
}

export default SubredditInfoModerator;
