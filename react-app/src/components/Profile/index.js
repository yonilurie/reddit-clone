import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/index.css";
import UserTabs from "./js/UserTabs";
import UserInfoCard from "./js/UserInfoCard";
import UserPostCard from "./js/UserPostCard";
function User() {
    const params = useParams();
	const [user, setUser] = useState({});
	const { username } = useParams();

	useEffect(() => {
		if (!username) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/u/${username}`);
			const user = await response.json();
			setUser(user);
			console.log(user);
		})();
	}, [username]);

	if (!user) {
		return null;
	}

	return (
		<>
			{user.username && (
				<>
					<UserTabs user={user}></UserTabs>
					<div className="profile-content-container-wide">
						<div className="profile-content-wide">
							{ params.tab === 'submitted' && user.posts.length > 0 &&
								user.posts.map((post) => {
									return (
										<UserPostCard
											key={post.id}
											post={post}
										/>
									);
								})}
						</div>
						
							<UserInfoCard user={user}></UserInfoCard>
							{/* <div className="user-communities">
								{user.subreddits.map((subreddit) => {
									return subreddit.name;
								})}
							</div> */}
						
					</div>
				</>
			)}
		</>
	);
}
export default User;
