import { useSelector } from "react-redux";

//User home page with content form their followed subreddits
function UserHomePage() {
	const user = useSelector((state) => state.session.user);
	return (
		<div>
			{user.member &&
				Object.values(user.member).map((membership) => {
					return (
						<div key={membership.id}>
							{membership.subreddit_info.name}
						</div>
					);
				})}
		</div>
	);
}

export default UserHomePage;
