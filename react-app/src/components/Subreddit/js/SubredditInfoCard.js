import SubredditInfoAbout from "./SubredditInfoAbout";
import SubredditInfoModerator from "./SubredditInfoModerator";
import SubredditInfoRules from "./SubredditInfoRules";

const SubredditInfoCard = ({ sub, title }) => {
	return (
		<div className="subreddit-info-card">
			<div className="subreddit-info-card-top">{title}</div>
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
