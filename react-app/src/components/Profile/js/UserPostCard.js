function UserPostCard({ post }) {
	return (
		<div className="user-post-container">
			<div className="votes-container">
				<div className="vote upvote">
					<i
						className={`fa-solid fa-arrow-up ${
							post.votes.user_vote ? "upvoted" : ""
						}`}
					></i>
				</div>
				<div className="votes"> {post.votes.total}</div>
				<div className="vote downvote">
					<i
						className={`fa-solid fa-arrow-down ${
							!post.votes.user_vote ? "downvoted" : ""
						}`}
					></i>
				</div>
			</div>
			<div className="profile-post-info-container">
				<div className="profile-post-info">
					{post.image ? (
						<img src={post.image} className="image-box"></img>
					) : (
						<div className="image-box"></div>
					)}
					<div className="profile-post-text">
						<div className="profile-post-title">{post.title}</div>
						<div className="profile-post-subreddit-time">
							<div className="profile-post-subreddit">
								r/{post.subreddit}{" "}
								<span className="profile-post-time">{`Posted by u/${post.username} 1 days ago`}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserPostCard;
