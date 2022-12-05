import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAComment, editAComment } from "../../store/subreddits";
import { authenticate } from "../../store/session";

function SinglePostMakeComment({ post, comment, setEditComment, editComment }) {
	const dispatch = useDispatch();

	const [commentText, setCommentText] = useState("");
	const user = useSelector((state) => state.session.user);

	//Change comment text on input
	const onChange = (e) => setCommentText(e.target.value);

	//Handle comment submit
	const onSubmit = (e) => {
		e.preventDefault();
		if (!user) return;
		if (comment) {
			if (commentText.length > 0 && commentText.length < 10000) {
				dispatch(
					editAComment(commentText, comment.id, post.subreddit_name)
				).then((data) => {
					dispatch(authenticate());
				});
				setCommentText("");
				setEditComment(false);
			}
		} else {
			if (commentText.length > 0 && commentText.length <= 10000) {
				dispatch(
					addAComment(commentText, post.id, post.subreddit_name)
				).then((data) => {
					dispatch(authenticate());
				});
				setCommentText("");
			}
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
