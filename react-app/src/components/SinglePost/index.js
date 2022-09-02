import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import SubredditBanner from "../Subreddit/js/SubredditBanner";
import SubredditInfoCard from "../Subreddit/js/SubredditInfoCard";
import { postVote, getTimeElapsed } from "../../util/index.js";
import "./css/index.css";

function SinglePostPage() {
	const [post, setPost] = useState(null);
	const [sub, setSub] = useState(null);
	const { subreddit, postId, postTitle } = useParams();
	useEffect(async () => {
		const getPost = await fetch(`/api/r/${postId}`);
		const data = await getPost.json();
		setPost(data);
		const getSub = await fetch(`/api/r/${subreddit}`);
		const subData = await getSub.json();
		setSub(subData);
	}, []);
	const getPercentUpvoted = (votes) => {
		const { upvote_count, downvote_count, total } = votes;

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

	const currentUser = useSelector((state) => state.session.user);
	return (
		<>
			{post && sub && (
				<>
					<SubredditBanner sub={sub}></SubredditBanner>
					<div className="single-post-sub-info-container">
						<div className="single-post-container">
							<div className="single-post">
								<div className="single-post-votes-container">
									<div
										className="vote upvote"
										onClick={() => {
											if (!currentUser) return;
											postVote(
												"true",
												post.id,
												currentUser.id
											);
										}}
									>
										<i
											className={`fa-solid fa-arrow-up ${
												currentUser &&
												currentUser.votes[post.id] &&
												currentUser.votes[post.id]
													.upvote === true &&
												"upvoted"
											}`}
										></i>
									</div>
									<div className="votes">
										{" "}
										{post.votes.upvote_count -
											post.votes.downvote_count}
									</div>
									<div
										className="vote downvote"
										onClick={() => {
											if (!currentUser) return;
											postVote(
												"false",
												post.id,
												currentUser.id
											);
										}}
									>
										<i
											className={`fa-solid fa-arrow-down ${
												currentUser &&
												currentUser.votes[post.id] &&
												currentUser.votes[post.id]
													.upvote === false &&
												"downvoted"
											}`}
										></i>
									</div>
								</div>
								<div className="single-post-details">
									<div className="sub-post-info">
										<div className="sub-post-text">
											<div className="profile-post-subreddit-time">
												<div className="profile-post-subreddit">
													<Link
														to={`/user/${post.user.username}`}
													>
														<span className="profile-post-time">{`Posted by u/${
															post.user.username
														} ${getTimeElapsed(
															post.created_at
														)}`}</span>
													</Link>
												</div>
											</div>{" "}
											<div className="sub-post-title">
												{post.title}
											</div>
										</div>

										{post.image && (
											<a
												href={post.image}
												target="_blank"
												rel="noreferrer"
											>
												<img
													src={post.image}
													className="image-box-subreddit"
												></img>
											</a>
										)}

										{post.text && (
											<div>
												{post.text ? (
													<div className="sub-text-box">
														{post.text}
													</div>
												) : null}
											</div>
										)}
										{post.link && (
											<a
												href={post.link}
												target="_blank"
												rel="noreferrer"
											>
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
											<div>{post.comments.length}</div>
										</div>

										<div className="share">
											<i className="fa-solid fa-share"></i>
											<div>share</div>
										</div>
										{currentUser &&
											currentUser.username ===
												post.user.username && (
												<div className="edit">...</div>
											)}
										<div className="vote-percent">
											{getPercentUpvoted(post.votes)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<SubredditInfoCard
							sub={sub}
							title="About Community"
						></SubredditInfoCard>
					</div>
				</>
			)}
		</>
	);
}

export default SinglePostPage;
