import { useSelector } from "react-redux";

function UserHomePage() {
	const user = useSelector((state) => state.session.user);
	return (
		<div>
			{user.member &&
                Object.values(user.member).map((membership) => {
                    console.log(membership)
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
