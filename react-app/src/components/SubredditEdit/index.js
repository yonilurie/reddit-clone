import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import SubredditEditPlaceholder from "./js/Placeholder";
import SubredditRules from "./js/Rules";
import DeleteSubreddit from "./js/DeleteSubreddit";
import CommunitySettings from "./js/CommunitySettings";
import RuleModal from "./js/RuleModal";
import { useEffect } from "react";

function SubredditEdit() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { subreddit, section } = useParams();
	const sub = useSelector(
		(state) => state.session.user.subreddits[subreddit]
	);
	if (
		section !== "about" &&
		section !== "rules" &&
		section !== "community-settings" &&
		section !== "delete"
	) {
		history.push(`/`);
	}
	return (
		<>
			{sub && (
				<div className="edit-subreddit-page-container">
					<div className="edit-subreddit-top-bar">
						<div>
							{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								className="subreddit-link-icon"
								id="edit-subreddit-icon"
							>
								<path
									d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"
									className="subreddit-link-icon"
								></path>
							</svg>
						</div>
						<Link
							className="edit-subreddit-link-sub"
							to={`/r/${sub.name}`}
						>
							{" "}
							{`R/${sub.name} / ${section.toUpperCase()}`}
						</Link>
					</div>
					<div className="edit-subreddit-page-container-inner">
						<div className="edit-subreddit-sidebar">
							<div className="profile-menu-section-title">
								<i className="fa-brands fa-reddit"></i>
								<div>About</div>
							</div>
							<Link
								to={`/r/${subreddit}/about`}
								className={`profile-menu-el user-links  ${
									section === "about" ? "selected" : ""
								}`}
							>
								Mod Tools
							</Link>
							<div className="profile-menu-section-title">
								<i className="fa-solid fa-scroll"></i>
								<div>OTHER</div>
							</div>
							<Link
								to={`/r/${subreddit}/rules`}
								className={`profile-menu-el user-links  ${
									section === "rules" ? "selected" : ""
								}`}
							>
								Rules
							</Link>
							<div className="profile-menu-section-title">
								<i className="fa-solid fa-gear"></i>
								<div>Settings</div>
							</div>
							<Link
								to={`/r/${subreddit}/community-settings`}
								className={`profile-menu-el user-links  ${
									section === "community-settings"
										? "selected"
										: ""
								}`}
							>
								Community Settings
							</Link>
							<div className="profile-menu-section-title">
								<i className="fa-solid fa-trash-can"></i>
								<div>DELETE</div>
							</div>
							<Link
								to={`/r/${subreddit}/delete`}
								className={`profile-menu-el user-links delete-sub ${
									section === "delete" ? "selected" : ""
								}`}
							>
								Delete this Community
							</Link>
						</div>
						{section === "about" && <SubredditEditPlaceholder />}
						{section === "rules" && <SubredditRules sub={sub} />}
						{section === "delete" && <DeleteSubreddit sub={sub} />}
						{section === "community-settings" && (
							<CommunitySettings sub={sub} />
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default SubredditEdit;
