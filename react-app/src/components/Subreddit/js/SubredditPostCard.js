import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { authenticate } from "../../../store/session.js";
import { postVote } from "../../../store/subreddits.js";

import LoginFormModal from "../../auth/LoginFormModal";

import { getTimeElapsed } from "../../../util/index.js";

//Inidividual post on subreddit
const SubredditPostCard = ({ post }) => {
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState();

	const currentUser = useSelector((state) => state.session.user);

	return (
		<div className="sub-post-container">
			<div className="votes-container">
				<LoginFormModal
					showModal={showModal}
					setShowModal={setShowModal}
					action={"Sign Up"}
				></LoginFormModal>
				<div
					className="vote upvote"
					onClick={() => {
						if (!currentUser) return setShowModal(true);
						dispatch(
							postVote("true", post.id, currentUser.id)
						).then(() => dispatch(authenticate()));
					}}
				>
					<i
						className={`fa-solid fa-arrow-up ${
							currentUser &&
							currentUser.votes[post.id] &&
							currentUser.votes[post.id].upvote === true &&
							"upvoted"
						}`}
					></i>
				</div>
				<div className="votes">
					{post.votes.upvote_count - post.votes.downvote_count}
				</div>
				<div
					className="vote downvote"
					onClick={() => {
						if (!currentUser) return setShowModal(true);
						dispatch(
							postVote("false", post.id, currentUser.id)
						).then(() => dispatch(authenticate()));
					}}
				>
					<i
						className={`fa-solid fa-arrow-down ${
							currentUser &&
							currentUser.votes[post.id] &&
							currentUser.votes[post.id].upvote === false &&
							"downvoted"
						}`}
					></i>
				</div>
			</div>
			<div className="sub-post-info-container">
				<div className="sub-post-info">
					<div className="sub-post-text">
						<div className="profile-post-subreddit-time">
							<div className="profile-post-subreddit">
								<span className="profile-post-time">
									{`Posted by `}
									<Link
										to={`/user/${post.user.username}/submitted`}
									>
										<span className="sub-post-time username">
											u/{post.user.username}
										</span>{" "}
									</Link>
									{getTimeElapsed(post.created_at)}
								</span>
							</div>
						</div>
						<Link to={`/r/${post.subreddit_name}/${post.id}`}>
							{" "}
							<div className="sub-post-title">{post.title}</div>
						</Link>
					</div>
					{post.image && (
						<a
							href={post.image}
							target="_blank"
							rel="noopener noreferrer"
							className="sub-image-link"
						>
							<img
								src={post.image}
								className="image-box-subreddit"
								alt="subreddit"
							></img>
						</a>
					)}

					{post.text && (
						<Link to={`/r/${post.subreddit_name}/${post.id}`}>
							{post.text && (
								<div className="sub-text-box">{post.text}</div>
							)}
						</Link>
					)}
					{post.link && (
						<a
							href={post.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="subreddit-url">
								{post.link.length > 50
									? `${post.link.slice(0, 50)}...`
									: post.link}

								<i className="fa-solid fa-up-right-from-square"></i>
							</div>
						</a>
					)}
				</div>
				<div className="single-post-bottom-bar">
					<Link to={`/r/${post.subreddit_name}/${post.id}`}>
						<div className="single-post-comments-count">
							<i className="fa-regular fa-message"></i>
							<div>{post.comment_count}</div>
						</div>
					</Link>
					{/* 
					<div className="share">
						<i className="fa-solid fa-share"></i>
						<div>share</div>
					</div> */}
					{/* {currentUser &&
						currentUser.username === post.user.username && (
							<div className="edit">...</div>
						)} */}
				</div>
			</div>
		</div>
	);
};

export default SubredditPostCard;
