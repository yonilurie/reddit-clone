import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeCommentVote } from "../../store/subreddits.js";
import { authenticate } from "../../store/session.js";

import { getTimeElapsed } from "../../util/index.js";
import CommentMenu from "./CommentMenu.js";
import SinglePostMakeComment from "./SinglePostMakeComment.js";

function SinglePostComment({ post, comment }) {
	const dispatch = useDispatch();

	const [editComment, setEditComment] = useState(false);
	const [collapse, setCollapse] = useState(true);
	const [showReply, setShowReply] = useState(false);
	const user = useSelector((state) => state.session.user);

	return (
		<>
			<div className="single-post-page-comment">
				<div className="single-post-comment-left">
					<img
						className="single-post-comment-profile-image"
						src={comment.user.profile_image}
						alt="profile"
					></img>
					<div
						className="comment-collapse-bar"
						onClick={() => setCollapse((state) => !state)}
					></div>
				</div>
				<div className="single-post-comment-right">
					<div className="single-post-comment-user-info">
						<span className="single-post-comment-username">
							{comment.user.username}
						</span>
						{" · "}
						<span className="single-post-comment-time-elapsed">
							{getTimeElapsed(comment.created_at)}
						</span>
					</div>
					<div className="single-post-comment-text">
						{comment.text}
					</div>
					<div className="single-post-comment-interact">
						<div className="single-post-comment-votes-container">
							<div
								className="vote upvote"
								onClick={() => {
									if (!user) return;
									dispatch(
										makeCommentVote(
											"true",
											comment.id,
											user.id,
											post.id
										)
									).then(() => dispatch(authenticate()));
								}}
							>
								<i
									className={`fa-solid fa-arrow-up ${
										user &&
										user.comment_votes[comment.id] &&
										user.comment_votes[comment.id]
											.upvote === true &&
										"upvoted"
									}`}
								></i>
							</div>
							<div>
								{comment.votes.upvote_count -
									comment.votes.downvote_count}
							</div>
							<div
								className="vote downvote"
								onClick={() => {
									if (!user) return;
									dispatch(
										makeCommentVote(
											"false",
											comment.id,
											user.id,
											post.id
										)
									).then(() => dispatch(authenticate()));
								}}
							>
								<i
									className={`fa-solid fa-arrow-down ${
										user &&
										user.comment_votes[comment.id] &&
										user.comment_votes[comment.id]
											.upvote === false &&
										"downvoted"
									}`}
								></i>
							</div>
						</div>
						{user && user.id === comment.user_id && (
							<div className="edit-comment-dots-container">
								<CommentMenu
									setEditComment={setEditComment}
									editComment={editComment}
									comment={comment}
								></CommentMenu>
							</div>
						)}
						<div
							className="comment-reply-box"
							onClick={() => setShowReply((state) => !state)}
						>
							<i className="fa-regular fa-message"></i>Reply
						</div>
					</div>
					{editComment && (
						<SinglePostMakeComment
							comment={comment}
							post={post}
							editComment={editComment}
							setEditComment={setEditComment}
						></SinglePostMakeComment>
					)}
				</div>
			</div>
			{showReply && (
				<SinglePostMakeComment
					post={post}
					editComment={editComment}
					setEditComment={setEditComment}
					commentToReply={comment}
					setCollapse={setCollapse}
					setShowReply={setShowReply}
				></SinglePostMakeComment>
			)}
			{!collapse && comment.replies.length > 0 && (
				<div className="comment-replies-container">
					{comment.replies.map((reply) => {
						return (
							<SinglePostComment
								key={reply.id}
								comment={reply}
								post={post}
								editComment={editComment}
								setEditComment={setEditComment}
							></SinglePostComment>
						);
					})}
				</div>
			)}
			{collapse && comment.replies.length > 0 && (
				<div
					className="reply-count"
					onClick={() => setCollapse((state) => !state)}
				>
					Continue this thread <i className="fa-solid fa-arrow-right"></i>
				</div>
			)}
		</>
	);
}

export default SinglePostComment;
