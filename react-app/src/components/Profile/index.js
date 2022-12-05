import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import UserTabs from "./js/UserTabs";
import UserInfoCard from "./js/UserInfoCard";
import UserPostCard from "./js/UserPostCard";
import UserModCard from "./js/UserModCard";
import PostForm from "../PostForm";
import PlaceholderPosts from "./js/PlaceholderPosts";

import "./css/index.css";

import { getUserInfo } from "../../store/subreddits";

//Profile page for a user
function User() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { tab, username } = useParams();

	const currentUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.subreddits[username]);

	//Get the info for the current pages user, if the user accesses
	// somehting they dont have access to, return
	useEffect(() => {
		if (!username) return;
		dispatch(getUserInfo(username)).then((data) => {
			if (data.error) history.push("/");
		});
		if (tab !== "submitted" && tab !== "upvoted" && tab !== "downvoted") {
			history.push(`/user/${username}/submitted`);
			return null;
		}
	}, [username, dispatch, history, tab]);

	//If the user does not exist or the page is not the current users, return
	useEffect(() => {
		if (tab === "upvoted" || tab === "downvoted") {
			if (currentUser && user && currentUser.id !== user.id) {
				return history.push(`/user/${username}/submitted`);
			}
		}
	}, [username, user, history, tab]);

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

								{tab === "upvoted" &&
									currentUser &&
									!Object.values(currentUser.votes).some(
										(ele) => ele.upvote === true
									) && (
										<div className="no-votes-container">
											<div className="no-votes-text">
												No posts upvoted yet
											</div>
										</div>
									)}
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
								{tab === "downvoted" &&
									currentUser &&
									!Object.values(currentUser.votes).some(
										(ele) => ele.upvote === false
									) && (
										<div className="no-votes-container">
											<div className="no-votes-text">
												No posts downvoted yet
											</div>
										</div>
									)}
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
