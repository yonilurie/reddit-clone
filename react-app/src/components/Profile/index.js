import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/index.css";
import UserTabs from "./js/UserTabs";
import UserInfoCard from "./js/UserInfoCard";
import UserPostCard from "./js/UserPostCard";
import UserModCard from "./js/UserModCard";
import PostForm from "../PostForm";
import PlaceholderPosts from "./js/PlaceholderPosts";
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
							{(params.tab === "submitted" ||
								params.tab === undefined) &&
								Object.values(user.posts).length > 0 &&
								Object.values(user.posts)
									.reverse()
									.map((post) => {
										return (
											<UserPostCard
												key={post.id}
												post={post}
												postId={post.id}
											/>
										);
									})}
							{params.tab === "submitted" &&
								Object.values(user.posts).length === 0 && (
									<PlaceholderPosts user={user} />
								)}
							<>
								{params.tab === "submit" && (
									<PostForm></PostForm>
								)}
								{params.tab === "upvoted" &&
									currentUser &&
									currentUser.username === user.username &&
									Object.values(currentUser.votes).length >
										0 &&
									Object.values(currentUser.votes)
										.reverse()
										.map((post) => {
											return post.upvote === true ? (
												<UserPostCard
													key={post.post.id}
													post={post.post}
												/>
											) : null;
										})}
								{params.tab === "downvoted" &&
									currentUser &&
									currentUser.username === user.username &&
									Object.values(currentUser.votes).length >
										0 &&
									Object.values(currentUser.votes)
										.reverse()
										.map((post) => {
											return post.upvote === false ? (
												<UserPostCard
													key={post.post.id}
													post={post.post}
												/>
											) : null;
										})}
								{params.tab === "downvoted" &&
									currentUser.username === user.username &&
									Object.values(currentUser.votes).length ===
										0 && (
										<div className="placeholder-posts-container-main">
											<div className="empty-post-main">
												{[
													1,
													2,
													3,
													4,
													5,
													6,
													7,
													8,
													9,
													10,
												].map((empty) => {
													return (
														<div
															className="empty-post-container"
															key={empty}
														>
															<div className="empty-votes">
																<i
																	className={`fa-solid fa-arrow-up `}
																></i>
																<i
																	className={`fa-solid fa-arrow-down `}
																></i>
															</div>
														</div>
													);
												})}
												<div className="empty-post-text-container-flex">
													<div className="empty-post-text">
														<div className="empty-post-big-text">
															hmm... seems u/
															{user.username}{" "}
															hasn't posted
															anything
														</div>
													</div>
												</div>
											</div>
										</div>
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
