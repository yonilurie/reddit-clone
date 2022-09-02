import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SubredditPostCard = ({ post }) => {
	const getTimeElapsed = (createdAt) => {
		let newDate = new Date(createdAt);
		let today = new Date();
		let diff = today.getTime() - newDate.getTime();
		let days = diff / (1000 * 3600 * 24);

		if (days * 24 < 1) {
			return `${Math.floor(days * 24 * 60)} minutes ago`;
		} else if (days < 1) {
			return `${Math.floor(days * 24)} hours ago`;
		} else {
			return `${Math.floor(days)} days ago`;
		}
	};
	const getPercentUpvoted = (votes) => {
		const { upvote_count, downvote_count, total } = votes;
		console.log(votes);
		if (downvote_count === 0 && upvote_count > 0) {
			return "100% Upvoted";
		}
		if (downvote_count === 0 && upvote_count === 0) {
			return "No votes yet";
		}
		if (downvote_count === upvote_count) {
			return "50% upvoted";
		}
		if (downvote_count > upvote_count) {
			return 100 - (upvote_count / downvote_count) * 100;
		}
		if (upvote_count > downvote_count) {
			return (upvote_count / downvote_count) * 100;
		}
	};
	console.log(post);
	const currentUser = useSelector((state) => state.session.user);

	const postVote = async (vote) => {
		if (!currentUser) return
		const formData = new FormData();
		formData.append("post_id", post.id);
		formData.append("user_id", currentUser.id);
		formData.append("upvote", vote);

		const data = await fetch("/api/vote", {
			method: "POST",
			body: formData,
		});
	};
	return (
		<div className="sub-post-container">
			<div className="votes-container">
				<div className="vote upvote" onClick={() => postVote("true")}>
					<i
						className={`fa-solid fa-arrow-up ${
							currentUser &&
							currentUser.votes[post.id] &&
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
					onClick={() => postVote("false")}
				>
					<i
						className={`fa-solid fa-arrow-down ${
							currentUser &&
							currentUser.votes[post.id] === false &&
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
								<Link to={`/user/${post.user.username}`}>
									<span className="profile-post-time">{`Posted by u/${
										post.user.username
									} ${getTimeElapsed(
										post.created_at
									)}`}</span>
								</Link>
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
						<a
							href={`/r/${post.subreddit}/${post.id}/${post.title}`}
							target="_blank"
							rel="noreferrer"
						>
							{post.text ? (
								<div className="sub-text-box">{post.text}</div>
							) : null}
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
				</div>
				<div className="single-post-bottom-bar">
					<div className="single-post-comments-count">
						<i className="fa-regular fa-message"></i>
						<div>{post.comment_count}</div>
					</div>

					<div className="share">
						<i class="fa-solid fa-share"></i>
						<div>share</div>
					</div>
					{currentUser && currentUser.username === post.user.username && (
						<div className="edit">...</div>
					)}
					<div className="vote-percent">
						{getPercentUpvoted(post.votes)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubredditPostCard;
