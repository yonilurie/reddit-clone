import { Link, useParams } from "react-router-dom";
function UserTabs({ user }) {
	const params = useParams();

	return (
		<div className="user-profile-tabs">
			<Link
				to={`/user/${user.username}`}
				className={`profile-tab-link ${
					params.tab == undefined ? "atpage" : ""
				}`}
			>
				OVERVIEW
			</Link>
			<Link
				to={`/user/${user.username}/submitted`}
				className={`profile-tab-link ${
					params.tab == "submitted" ? "atpage" : ""
				}`}
			>
				POSTS
			</Link>
			<Link
				to={`/user/${user.username}/comments`}
				className={`profile-tab-link ${
					params.tab == "comments" ? "atpage" : ""
				}`}
			>
				COMMENTS
			</Link>
			<Link
				to={`/user/${user.username}/upvoted`}
				className={`profile-tab-link ${
					params.tab == "upvoted" ? "atpage" : ""
				}`}
			>
				UPVOTED
			</Link>
			<Link
				to={`/user/${user.username}/downvoted`}
				className={`profile-tab-link ${
					params.tab == "downvoted" ? "atpage" : ""
				}`}
			>
				DOWNVOTED
			</Link>
		</div>
	);
}

export default UserTabs;
