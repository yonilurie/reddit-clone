import { getTimeElapsed, getPercentUpvoted } from "../../util/index.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import SinglePostMakeComment from "./SinglePostMakeComment.js";
function SinglePostComment({ post, comment }) {
	const [editComment, setEditComment] = useState(false);
	const user = useSelector((state) => state.session.user);
	return (
		<div key={comment.id} className="single-post-page-comment">
			<div className="single-post-comment-left">
				<img
					className="single-post-comment-profile-image"
					src={comment.user.profile_image}
				></img>
				<div className="comment-collapse-bar"></div>
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
				<div className="single-post-comment-text">{comment.text}</div>
				<div className="single-post-comment-interact">
					<div className="single-post-comment-votes-container">
						<div>
							<i className="fa-solid fa-arrow-up"></i>
						</div>
						<div>0</div>
						<div>
							{" "}
							<i className="fa-solid fa-arrow-down"></i>
						</div>
					</div>
					{user.id === comment.user_id && (
						<div className="edit-comment-dots-container">
							<div onClick={() => setEditComment(true)}>...</div>
							{editComment && (
								<SinglePostMakeComment comment={comment}  post={post} ></SinglePostMakeComment>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default SinglePostComment;
