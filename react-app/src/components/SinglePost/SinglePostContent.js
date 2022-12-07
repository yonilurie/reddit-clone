import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTimeElapsed, getPercentUpvoted } from "../../util/index.js";
import { postVote } from "../../store/subreddits";
import { authenticate } from "../../store/session";

import TextForm from "../PostForm/js/TextForm";
import PostMenu from "../PostMenu";
import LoginFormModal from "../auth/LoginFormModal";

//Show content for single post
function SinglePostContent({
	post,
	showModal,
	setShowModal,
	edit,
	setEdit,
	onSubmit,
	text,
	setText,
}) {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.session.user);

	const votes = post.votes;

	//Format time
	const getTime = (time) => {
		const tempDate = new Date(time);
		const newTime = tempDate.toLocaleString();
		return newTime;
	};

	return (
		<div className="single-post">
			<div className="single-post-votes-container">
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
						).then((data) => dispatch(authenticate()));
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
					{votes.upvote_count - votes.downvote_count}
				</div>
				<div
					className="vote downvote"
					onClick={() => {
						if (!currentUser) return setShowModal(true);
						dispatch(
							postVote("false", post.id, currentUser.id)
						).then((data) => dispatch(authenticate()));
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
			<div className="single-post-details">
				<div className="sub-post-info single">
					<div className="sub-post-text">
						<div className="profile-post-subreddit-time">
							<div className="profile-post-subreddit">
								<span className="profile-post-time">
									{`Posted by `}
									<Link
										to={`/user/${post.user.username}/submitted`}
									>
										<span className="profile-post-username">
											{`u/${post.user.username} `}{" "}
										</span>
									</Link>
									{`${getTimeElapsed(post.created_at)}`}
									{post.updated_at && (
										<span>
											{" "}
											Edited:{" "}
											{getTime(post.updated_at)
												.split(" ")
												.splice(0, 3)
												.join(" ")}
										</span>
									)}
								</span>
							</div>
						</div>
						<div className="sub-post-title">{post.title}</div>
					</div>
					{post.image && (
						<a
							href={post.image}
							target="_blank"
							rel="noopener noreferrer"
							className="single-post-image-link"
						>
							<img
								src={post.image}
								className="image-box-subreddit"
								alt="subreddit"
							></img>
						</a>
					)}
					{post.text && !edit && (
						<div>
							{post.text && (
								<div className="sub-text-box single">
									{post.text}
								</div>
							)}
						</div>
					)}
					{post.type_of_post === "text" && edit === true && (
						<>
							<form onSubmit={onSubmit}>
								<TextForm
									text={text}
									setText={setText}
									post={post}
								></TextForm>
								<button
									className="submit-post-button"
									id="post-edit-submit-button"
								>
									Submit
								</button>
							</form>
							<button
								onClick={() => setEdit(false)}
								className="cancel-button"
								id="post-edit-cancel-button"
							>
								Cancel
							</button>
						</>
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
								{post.link}
							</div>
						</a>
					)}
				</div>
				<div className="single-post-bottom-bar">
					<div className="single-post-bottom-bar-left">
						<div className="single-post-comments-count">
							<i className="fa-regular fa-message"></i>
							<div>{post.comment_count}</div>
						</div>
						{/* <div className="share">
							<i className="fa-solid fa-share"></i>
							<div>share</div>
						</div> */}
						{currentUser &&
							currentUser.username === post.user.username &&
							!edit && <PostMenu post={post}></PostMenu>}
					</div>
					<div className="vote-percent">
						{getPercentUpvoted(votes)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePostContent;
