import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postVote } from "../../../util/index.js";

function UserPostCard({ post }) {
	console.log(post);
	const user = useSelector((state) => state.session.user);
	return (
		<div className="user-post-container">
			<div className="votes-container">
				<div
					className="vote upvote"
					onClick={() => {
						if (!user) return;
						postVote("true", post.id, user.id);
					}}
				>
					<i
						className={`fa-solid fa-arrow-up ${
							user &&
							user.votes[post.id] &&
							user.votes[post.id].upvote === true &&
							"upvoted"
						}`}
					></i>
				</div>
				<div className="votes">
					{" "}
					{post.votes.upvote_count - post.votes.downvote_count}
				</div>
				<div
					className="vote downvote"
					onClick={() => {
						if (!user) return;
						postVote("false", post.id, user.id);
					}}
				>
					<i
						className={`fa-solid fa-arrow-down ${
							user &&
							user.votes[post.id] &&
							user.votes[post.id].upvote === false &&
							"downvoted"
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
						<Link to={`/r/${post.subreddit_name}`}>
							<div className="profile-post-title">
								{post.title}
							</div>
						</Link>
						<div className="profile-post-subreddit-time">
							<div className="profile-post-subreddit">
								r/{post.subreddit_name}{" "}
								<span className="profile-post-time">
									{`Posted by `}
									<Link to={`/user/${post.user.username}`}>
										<span className="profile-post-username">
											u/{post.user.username}
										</span>
										1 days ago
									</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{user && user.username === post.user.username && (
				<div className="edit-toggle" onClick={() => "wow"}>
					...
				</div>
			)}
		</div>
	);
}

export default UserPostCard;
