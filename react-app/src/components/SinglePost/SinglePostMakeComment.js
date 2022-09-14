import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAComment } from "../../store/subreddits";
import { authenticate } from "../../store/session";
function SinglePostMakeComment({ post, comment }) {
	const dispatch = useDispatch();
	const [commentText, setCommentText] = useState("");
	const onChange = (e) => {
		setCommentText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (commentText.length > 0 && commentText.length < 10000) {
			dispatch(
				addAComment(commentText, post.id, post.subreddit_name)
			).then((data) => {
				dispatch(authenticate());
			});
			setCommentText("");
		}
	};

	useEffect(() => {
		if (comment) {
			setCommentText(comment.text);
		}
	}, []);

	return (
		<form className="make-comment-form" onSubmit={onSubmit}>
			<textarea
				placeholder="What are your thoughts?"
				className="make-comment-input"
				value={commentText}
				onChange={(e) => onChange(e)}
			></textarea>
			<div className="make-comment-form-bottom-container">
				<button
					className={`submit-comment-button ${
						commentText.length === 0 ? "disabled-comment" : ""
					} `}
				>
					Comment
				</button>
			</div>
		</form>
	);
}

export default SinglePostMakeComment;