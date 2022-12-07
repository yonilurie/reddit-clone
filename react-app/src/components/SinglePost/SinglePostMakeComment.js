import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	addAComment,
	editAComment,
	replyToAComment,
} from "../../store/subreddits";
import { authenticate } from "../../store/session";

function SinglePostMakeComment({
	post,
	comment,
	setEditComment,
	editComment,
	commentToReply,
	setCollapse,
	setShowReply,
}) {
	const dispatch = useDispatch();

	const [commentText, setCommentText] = useState("");
	const user = useSelector((state) => state.session.user);

	//Change comment text on input
	const onChange = (e) => setCommentText(e.target.value);

	//Handle comment submit
	const onSubmit = (e) => {
		e.preventDefault();
		if (!user) return;
		if (commentText.length === 0 || commentText.length >= 10000) return;
		if (commentToReply) {
			dispatch(
				replyToAComment(
					commentText,
					post.id,
					post.subreddit_name,
					commentToReply.id
				)
			).then((data) => {
				dispatch(authenticate());
			});
			setCommentText("");
			setCollapse(false);

			setShowReply((state) => !state);
		} else if (comment) {
			dispatch(
				editAComment(commentText, comment.id, post.subreddit_name)
			).then((data) => {
				dispatch(authenticate());
			});
			setCommentText("");
			setEditComment(false);
		} else {
			dispatch(
				addAComment(commentText, post.id, post.subreddit_name)
			).then((data) => {
				dispatch(authenticate());
			});
			setCommentText("");
		}
	};

	// If user is editing comment, prefill the value into input field
	useEffect(() => {
		if (comment) setCommentText(comment.text);
	}, [comment]);

	return (
		<form className="make-comment-form" onSubmit={onSubmit}>
			<textarea
				placeholder="What are your thoughts?"
				className="make-comment-input"
				value={commentText}
				onChange={(e) => onChange(e)}
				maxLength="10000"
			></textarea>
			<div className="make-comment-form-bottom-container">
				{editComment && (
					<div
						id="comment-edit-cancel-button"
						className="cancel-button"
						onClick={() => setEditComment(false)}
					>
						Cancel
					</div>
				)}
				<button
					className={`submit-comment-button ${
						commentText.length === 0 ? "disabled-comment" : ""
					} `}
				>
					{comment ? "Save Edits" : "Comment"}
				</button>
			</div>
		</form>
	);
}

export default SinglePostMakeComment;
