import { Link } from "react-router-dom";
import React from 'react'
//Card which shows the subreddits a user is a moderator of
function UserModCard({ user }) {

	return (
		<div className="moderator-card">
			<h2 className="moderator-title">Moderator of these communities</h2>
			{user.subreddits.map((subreddit) => {
				return (
					<div className="subreddit-link" key={subreddit.id}>
						<div className="subreddit-link-left">
							<div></div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								className="subreddit-link-icon"
							>
								<path
									d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"
									className="subreddit-link-icon"
								></path>
							</svg>
							<Link
								to={`/r/${subreddit.name}`}
								className="subreddit-link-link"
							>
								{" "}
								r/{subreddit.name}
							</Link>
						</div>
						<Link to={`/r/${subreddit.name}`} className="subreddit-link-right">
							<button className="subreddit-link-join-button">
								Visit
							</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default UserModCard;
