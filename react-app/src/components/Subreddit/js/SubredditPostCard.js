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


	const currentUser = useSelector((state) => state.session.user);
	return (
		<div className="sub-post-container">
			<div className="votes-container">
				<div className="vote upvote">
					<i
						className={`fa-solid fa-arrow-up ${
							currentUser.votes[post.id] ? "upvoted" : ""
						}`}
					></i>
				</div>
				<div className="votes"> {post.votes.total}</div>
				<div className="vote downvote">
					<i
						className={`fa-solid fa-arrow-down ${
							currentUser.votes[post.id] === false
								? "downvoted"
								: ""
						}`}
					></i>
				</div>
			</div>
			<div className="sub-post-info-container">
				<div className="sub-post-info">
					<div className="profile-post-text">
						<div className="profile-post-title">{post.title}</div>
						<div className="profile-post-subreddit-time">
							<Link to={`/r/${post.subreddit}`}>
								<div className="profile-post-subreddit">
									r/{post.subreddit}{" "}
									<span className="profile-post-time">{`Posted by u/${
										post.user.username
									} ${getTimeElapsed(
										post.created_at
									)}`}</span>
								</div>
							</Link>
						</div>
					</div>
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
				</div>
			</div>
		</div>
	);
};

export default SubredditPostCard;
