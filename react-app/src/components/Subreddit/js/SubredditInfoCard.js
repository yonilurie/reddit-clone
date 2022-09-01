import SubredditInfoAbout from "./SubredditInfoAbout";
import SubredditInfoModerator from "./SubredditInfoModerator";
import SubredditInfoRules from "./SubredditInfoRules";

const SubredditInfoCard = ({ sub, title }) => {
	return (
		<div className="subreddit-info-card">
			<div className="subreddit-info-card-top">{title}</div>
			{/* {sub.name && (
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
				</div>
			)} */}
			{title === "About Community" ? (
				<SubredditInfoAbout sub={sub}></SubredditInfoAbout>
			) : null}
			{title === `r/${sub.name} Rules` ? (
				<SubredditInfoRules sub={sub}></SubredditInfoRules>
			) : null}
			{title === `Moderator` ? (
				<SubredditInfoModerator sub={sub}></SubredditInfoModerator>
			) : null}
		</div>
	);
};

export default SubredditInfoCard;
