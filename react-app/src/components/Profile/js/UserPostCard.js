import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { postUserVote, postVote } from "../../../store/subreddits";
import { authenticate } from "../../../store/session.js";
import PostMenu from "../../PostMenu/index.js";
import { getTimeElapsed } from "../../../util/index.js";
import LoginFormModal from "../../auth/LoginFormModal";

//Post on a users profile page
function UserPostCard({ postId, post }) {
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);

	const user = useSelector((state) => state.session.user);

	return (
		<div className="user-post-container">
			<>
				<div className="votes-container">
					<LoginFormModal
						showModal={showModal}
						setShowModal={setShowModal}
						action={"Sign Up"}
					></LoginFormModal>
					<div
						className="vote upvote"
						onClick={() => {
							if (!user) return setShowModal(true);
							if (post.user.username === user.username) {
								dispatch(
									postUserVote("true", post.id, user.id)
								).then((data) => dispatch(authenticate()));
							} else {
								dispatch(
									postVote("true", post.id, user.id)
								).then((data) => dispatch(authenticate()));
							}
						}}
					>
						<i
							className={`fa-solid fa-arrow-up ${
								user &&
								user.votes[post.id] &&
								user.votes[post.id].upvote === true &&
								"upvoted"
							}`}
						></i>
					</div>
					<div className="votes">
						{" "}
						{post.votes.upvote_count - post.votes.downvote_count}
					</div>
					<div
						className="vote downvote"
						onClick={() => {
							if (!user) return setShowModal(true);
							if (post.user.username === user.username) {
								dispatch(
									postUserVote("false", post.id, user.id)
								).then((data) => dispatch(authenticate()));
							} else {
								dispatch(
									postVote("false", post.id, user.id)
								).then((data) => dispatch(authenticate()));
							}
						}}
					>
						<i
							className={`fa-solid fa-arrow-down ${
								user &&
								user.votes[post.id] &&
								user.votes[post.id].upvote === false &&
								"downvoted"
							}`}
						></i>
					</div>
				</div>
				<div className="profile-post-info-container">
					<div className="profile-post-info">
						{post.image && (
							<a
								href={post.image}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={post.image}
									alt="post"
									className="image-box"
								></img>
							</a>
						)}

						{post.text && (
							<a
								href={`/r/${post.subreddit_name}/${post.id}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="image-box">
									<i className="fa-solid fa-align-justify"></i>
								</div>
							</a>
						)}
						{post.link && (
							<a
								href={post.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="image-box">
									<i className="fa-solid fa-link"></i>
									<i className="fa-solid fa-arrow-up-right-from-square"></i>
								</div>
							</a>
						)}

						{!post.link && !post.text && !post.image && (
							<a
								href={`/r/${post.subreddit_name}/${post.id}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="image-box">
									<i className="fa-solid fa-align-justify"></i>
								</div>
							</a>
						)}

						<div className="profile-post-text">
							<Link to={`/r/${post.subreddit_name}/${post.id}`}>
								<div className="profile-post-title">
									{post.title}
								</div>
							</Link>
							<div className="profile-post-subreddit-time">
								<div className="profile-post-subreddit">
									<Link to={`/r/${post.subreddit_name}`}>
										{" "}
										<span className="sub-link">
											r/{post.subreddit_name}{" "}
										</span>
									</Link>

									<span className="profile-post-time">
										{`Posted by `}
										<Link
											to={`/user/${post.user.username}/submitted`}
										>
											<span className="profile-post-username">
												u/{post.user.username}
											</span>{" "}
											{getTimeElapsed(post.created_at)}{" "}
										</Link>
									</span>
								</div>
							</div>
							<div className="profile-post-bottom-bar">
								<Link
									to={`/r/${post.subreddit_name}/${post.id}`}
								>
									<div className="single-post-comments-count">
										<i className="fa-regular fa-message"></i>
										<div>{post.comment_count}</div>
									</div>
								</Link>

								{/* <div className="share">
									<i className="fa-solid fa-share"></i>
									<div>share</div>
								</div> */}
								{user &&
									user.username === post.user.username && (
										<PostMenu post={post}></PostMenu>
									)}
							</div>
						</div>
					</div>
				</div>
			</>
		</div>
	);
}

export default UserPostCard;
