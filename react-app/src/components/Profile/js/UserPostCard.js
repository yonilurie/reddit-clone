import { Link } from "react-router-dom";

function UserPostCard({ post }) {
	console.log(post);
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
							post.votes.user_vote === false ? "downvoted" : ""
						}`}
					></i>
				</div>
			</div>
			<div className="profile-post-info-container">
				<div className="profile-post-info">
					{post.image && (
						<a href={post.image} target="_blank" rel="noreferrer">
							<img src={post.image} className="image-box"></img>
						</a>
					)}

					{post.text && (
						<a
							href={`/r/${post.subreddit}/${post.id}/${post.title}`}
							target="_blank"
							rel="noreferrer"
						>
							<div className="image-box">
								<i className="fa-solid fa-align-justify"></i>
							</div>
						</a>
					)}
					{post.link && (
						<a href={post.link} target="_blank" rel="noreferrer">
							<div className="image-box">
								<i className="fa-solid fa-link"></i>
								<i className="fa-solid fa-arrow-up-right-from-square"></i>
							</div>
						</a>
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
