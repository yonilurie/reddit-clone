import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { toggleMembership, getSubMembers } from "../../../store/subreddits";
import { authenticate } from "../../../store/session";

//Banner for a subreddit
const SubredditBanner = ({ sub }) => {
	const { subreddit } = useParams();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);

	//Toggles user joining a subreddit
	const toggleJoin = (subredditId) => {
		dispatch(toggleMembership(subredditId)).then(() => {
			dispatch(authenticate()).then(() => {
				dispatch(getSubMembers(subreddit));
			});
		});
	};

	return (
		<div className="subreddit-banner">
			<div className="subreddit-banner-inner">
				<Link to={subreddit ? `/r/${subreddit}` : ""}>
					<div className="banner">
						<div
							className="banner-image"
							alt="banner"
							style={{ backgroundColor: `${sub.color}` }}
						></div>
					</div>
				</Link>
				<div className="banner-title-container">
					<Link to={subreddit ? `/r/${subreddit}` : ""}>
						<div className="banner-title">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								className="sub-icon"
							>
								<path
									d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"
									className="sub-icon"
									style={{ fill: `${sub.color}` }}
								></path>
							</svg>

							<div className="title-name">
								<h1 className="sub-display-name">
									{sub.display_name
										? sub.display_name
										: sub.name}
								</h1>
								<div className="sub-name">r/{sub.name}</div>
							</div>
						</div>
					</Link>
					{subreddit && (
						<button
							className="subreddit-join"
							style={{
								backgroundColor: `${sub.color}`,
								color: "white",
							}}
							onClick={() => {
								if (!user) return;
								toggleJoin(sub.id);
							}}
						>
							{user && user.member[sub.id] && "Joined"}
							{user && !user.member[sub.id] && "Join"}
							{!user && "Join"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default SubredditBanner;
