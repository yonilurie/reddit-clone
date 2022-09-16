import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Tabs for users page
function UserTabs({ user }) {
	const params = useParams();
	const { username } = useParams();

	const currentUser = useSelector((state) => state.session.user);
	return (
		<div className="user-profile-tabs">
			<Link
				to={`/user/${user.username}/submitted`}
				className={`profile-tab-link ${
					params.tab === "submitted" || params.tab === undefined
						? "atpage"
						: ""
				}`}
			>
				POSTS
			</Link>
			{/* <Link
				to={`/user/${user.username}/comments`}
				className={`profile-tab-link ${
					params.tab == "comments" ? "atpage" : ""
				}`}
			>
				COMMENTS
			</Link> */}
			{currentUser && currentUser.username === username && (
				<Link
					to={`/user/${user.username}/upvoted`}
					className={`profile-tab-link ${
						params.tab === "upvoted" ? "atpage" : ""
					}`}
				>
					UPVOTED
				</Link>
			)}
			{currentUser && currentUser.username === username && (
				<Link
					to={`/user/${user.username}/downvoted`}
					className={`profile-tab-link ${
						params.tab === "downvoted" ? "atpage" : ""
					}`}
				>
					DOWNVOTED
				</Link>
			)}
		</div>
	);
}

export default UserTabs;
