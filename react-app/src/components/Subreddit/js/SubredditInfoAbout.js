import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//Subreddit info card
function SubredditInfoAbout({ sub }) {
	const user = useSelector((state) => state.session.user);

	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-info">
					<div className="subreddit-description">
						{sub.description
							? sub.description
							: "No description yet"}
					</div>
					<div className="subreddit-stats">
						<div className="members-num">{sub.members}</div>
						<div className="members-text">Members</div>
					</div>
					<div className="subreddit-created-at">
						<i className="fa-solid fa-cake-candles"></i>
						<div className="subreddit-created-date">
							Created{" "}
							{sub.created_at.split(" ").splice(1, 3).join(" ")}
						</div>
					</div>
					{user && (
						<Link
							to={{
								pathname: `/user/${user.username}/submit`,
								state: { postSubId: sub.id },
							}}
							className="new-post-button-container"
						>
							<button className="new-post-button">
								New Post
							</button>
						</Link>
					)}
				</div>
			)}
		</>
	);
}

export default SubredditInfoAbout;
