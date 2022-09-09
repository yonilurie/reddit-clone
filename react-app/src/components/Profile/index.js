import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
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
	const history = useHistory();
	const { tab, username } = useParams();

	const currentUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.subreddits[username]);

	useEffect(() => {
		if (!username) return;
		dispatch(getUserInfo(username)).then((data) => {
			if (data.error) {
				history.push("/");
			}
		});
		if (
			tab !== "submitted" &&
			tab !== "upvoted" &&
			tab !== "downvoted" &&
			tab !== undefined
		) {
			history.push(`/user/${username}`);
			return null;
		}
	}, [username]);

	useEffect(() => {
		if (!user) {
			return null;
		}

		if (tab === "upvoted" || tab === "downvoted") {
			history.push(`/user/${username}`);
			return null;
		}
	}, [username, user]);

	return (
		<>
			{user && user.username && (
				<>
					<UserTabs user={user}></UserTabs>
					<div className="profile-content-container-wide">
						<div className="profile-content-wide">
							{(tab === "submitted" || tab === undefined) &&
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
							{(tab === "submitted" || tab === undefined) &&
								Object.values(user.posts).length === 0 && (
									<PlaceholderPosts user={user} />
								)}
							<>
								{tab === "submit" && <PostForm></PostForm>}
								{tab === "upvoted" &&
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
								{tab === "downvoted" &&
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
							</>
						</div>
						<div className="user-info-main-container">
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
