import SinglePostComment from "./SinglePostComment";
import SinglePostMakeComment from "./SinglePostMakeComment";

function SinglePostCommentContainer({ post }) {
	return (
		<div className="single-post-comments-container">
			<SinglePostMakeComment post={post}></SinglePostMakeComment>
			{post.comments.length > 0 &&
				post.comments.map((comment) => {
					return (
						<SinglePostComment
							comment={comment}
						></SinglePostComment>
					);
				})}
		</div>
	);
}

export default SinglePostCommentContainer;
