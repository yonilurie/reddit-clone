import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	getTimeElapsed,
	getPercentUpvoted,
	postVote,
} from "../../../util/index.js";
const SubredditPostCard = ({ post }) => {
	const currentUser = useSelector((state) => state.session.user);
	return (
		<div className="sub-post-container">
			<div className="votes-container">
				<div
					className="vote upvote"
					onClick={() => {
						if (!currentUser) return;
						postVote("true", post.id, currentUser.id);
					}}
				>
					<i
						className={`fa-solid fa-arrow-up ${
							currentUser &&
							currentUser.votes[post.id] &&
							currentUser.votes[post.id].upvote === true &&
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
						if (!currentUser) return;
						postVote("false", post.id, currentUser.id);
					}}
				>
					<i
						className={`fa-solid fa-arrow-down ${
							currentUser &&
							currentUser.votes[post.id] &&
							currentUser.votes[post.id].upvote === false &&
							"downvoted"
						}`}
					></i>
				</div>
			</div>
			<div className="sub-post-info-container">
				<div className="sub-post-info">
					<div className="sub-post-text">
						<div className="profile-post-subreddit-time">
							<div className="profile-post-subreddit">
								<span className="profile-post-time">
									{`Posted by `}
									<Link to={`/user/${post.user.username}`}>
										<span className="sub-post-time username">
											u/{post.user.username}
										</span>{" "}
									</Link>
									{getTimeElapsed(post.created_at)}
								</span>
							</div>
						</div>
						<Link
							to={`/r/${post.subreddit_name}/${post.id}/${post.title}`}
						>
							{" "}
							<div className="sub-post-title">{post.title}</div>
						</Link>
					</div>
					{post.image && (
						<a href={post.image} target="_blank" rel="noreferrer">
							<img
								src={post.image}
								className="image-box-subreddit"
							></img>
						</a>
					)}

					{post.text && (
						<Link
							to={`/r/${post.subreddit}/${post.id}/${post.title}`}
						>
							{post.text ? (
								<div className="sub-text-box">{post.text}</div>
							) : null}
						</Link>
					)}
					{post.link && (
						<a href={post.link} target="_blank" rel="noreferrer">
							<div className="image-box">
								<i className="fa-solid fa-link"></i>
								<i className="fa-solid fa-arrow-up-right-from-square"></i>
							</div>
						</a>
					)}
				</div>
				<div className="single-post-bottom-bar">
					<div className="single-post-comments-count">
						<i className="fa-regular fa-message"></i>
						<div>{post.comment_count}</div>
					</div>

					<div className="share">
						<i className="fa-solid fa-share"></i>
						<div>share</div>
					</div>
					{currentUser &&
						currentUser.username === post.user.username && (
							<div className="edit">...</div>
						)}
				</div>
			</div>
		</div>
	);
};

export default SubredditPostCard;
