import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SubredditInfoAbout from "./SubredditInfoAbout";
import SubredditInfoModerator from "./SubredditInfoModerator";
import SubredditInfoRules from "./SubredditInfoRules";

const SubredditInfoCard = ({ sub, title }) => {
	const currentUser = useSelector((state) => state.session.user);
	return (
		<div className="subreddit-info-card">
			<div className="subreddit-info-card-top">
				<div>{title}</div>
				{title === "About Community" && currentUser.id === sub.owner.owner_id && (
					<div>
						<Link
							to={`/r/${sub.name}/about`}
							className="mod-tools-container"
						>
							<i className="fa-solid fa-shield"></i>
							Mod Tools
						</Link>
					</div>
				)}
			</div>
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
