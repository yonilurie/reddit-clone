import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/index.css";
import UserTabs from "./js/UserTabs";
import UserInfoCard from "./js/UserInfoCard";
import UserPostCard from "./js/UserPostCard";
import UserModCard from "./js/UserModCard";
import PostForm from "../PostForm";
import { getUserInfo } from "../../store/subreddits";
function User() {
	const dispatch = useDispatch();
	const params = useParams();
	const { username } = useParams();
	const currentUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.subreddits[username]);

	useEffect(() => {
		if (!username) return;
		dispatch(getUserInfo(username));
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
								Object.values(user.posts).length > 0 &&
								Object.values(user.posts).map((post) => {
									return (
										<UserPostCard
											key={post.id}
											post={post}
											postId={post.id}
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
						<div>
							<UserInfoCard user={user}></UserInfoCard>
							{Object.values(user.subreddits).length > 0 && (
								<UserModCard user={user}></UserModCard>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
export default User;
