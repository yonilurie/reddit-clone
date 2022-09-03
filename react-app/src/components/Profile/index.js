import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/index.css";
import UserTabs from "./js/UserTabs";
import UserInfoCard from "./js/UserInfoCard";
import UserPostCard from "./js/UserPostCard";
import PostForm from "../PostForm";

function User() {
	const params = useParams();
	const { username } = useParams();
	const [user, setUser] = useState({});
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		if (!username) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/u/${username}`);
			const user = await response.json();
			setUser(user);
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
							{params.tab === "submitted" &&
								user.posts.length > 0 &&
								user.posts.map((post) => {
									return (
										<UserPostCard
											key={post.id}
											post={post}
										/>
									);
								})}

							<>
								{params.tab === "submit" && (
									<PostForm></PostForm>
								)}
								{params.tab === "upvoted" &&
									currentUser &&
									currentUser.username === user.username &&
									Object.values(currentUser.votes).length >
										0 &&
									Object.values(currentUser.votes).map(
										(post) => {
											return post.upvote === true ? (
												<UserPostCard
													key={post.post.id}
													post={post.post}
												/>
											) : null;
										}
									)}
								{params.tab === "downvoted" &&
									currentUser &&
									currentUser.username === user.username &&
									Object.values(currentUser.votes).length >
										0 &&
									Object.values(currentUser.votes).map(
										(post) => {
											return post.upvote === false ? (
												<UserPostCard
													key={post.post.id}
													post={post.post}
												/>
											) : null;
										}
									)}
							</>
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
