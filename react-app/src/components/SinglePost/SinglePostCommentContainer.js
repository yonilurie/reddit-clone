import SinglePostComment from "./SinglePostComment";
import SinglePostMakeComment from "./SinglePostMakeComment";

//Container for a posts comments
function SinglePostCommentContainer({ post, editComment, setEditComment }) {
	return (
		<div className="single-post-comments-container">
			<SinglePostMakeComment post={post}></SinglePostMakeComment>
			{post.comments.length > 0 &&
				post.comments.map((comment) => {
					return (
						<SinglePostComment
							key={comment.id}
							comment={comment}
							post={post}
							editComment={editComment}
							setEditComment={setEditComment}
						></SinglePostComment>
					);
				})}
		</div>
	);
}

export default SinglePostCommentContainer;
