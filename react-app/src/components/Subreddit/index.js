import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SubredditPostCard from "./js/SubredditPostCard";
import "./css/index.css";
import SubredditInfoCard from "./js/SubredditInfoCard";
import SubredditBanner from "./js/SubredditBanner";
import SubredditInfoAbout from "./js/SubredditInfoAbout";
import SubredditInfoRules from "./js/SubredditInfoRules";
import SubredditInfoModerator from "./js/SubredditInfoModerator";
import { useSelector } from "react-redux";

const Subreddit = () => {
	const { subreddit } = useParams();
	const [sub, setSub] = useState(null);
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		if (!subreddit) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/r/${subreddit}`);
			const subredditInfo = await response.json();
			setSub(subredditInfo);

			const response2 = await fetch(`/api/r/${subredditInfo.id}/posts`);
			const postsArr = await response2.json();
			setPosts(postsArr.reverse());
		})();
	}, [subreddit]);
	const currentUser = useSelector((state) => state.session.user);
	return (
		<div className="subreddit-outer-container">
			{sub && posts && (
				<>
					<SubredditBanner sub={sub} />
					<div className="subreddit-inner-container">
						<div className="subreddit-posts">
							{
								posts.length > 0
									? posts.map((post) => (
											<SubredditPostCard
												post={post}
												key={post.id}
											></SubredditPostCard>
									  ))
									: null
								// <div className="sub-post-container">
								// 	<div
								// 		className="no-posts-yet"
								// 		style={{
								// 			width: "100%",
								// 			height: "100%",
								// 			display: "flex",
								// 			justifyContent: "center",
								// 			alignItems: "center",
								// 			paddingLeft: "25px",
								// 		}}
								// 	>
								// 		<div
								// 			className="no-posts-yet-text"
								// 			style={{
								// 				width: "100%",
								// 				height: "100%",
								// 				display: "flex",
								// 				// justifyContent: "center",
								// 				alignItems: "center",
								// 				color: "rgb(205,205,205)",
								// 				fontSize: "36px",
								// 			}}
								// 		>
								// 			No posts yet... Be the First{" "}
								// 		</div>{" "}
								// 	</div>
								// </div>
							}
						</div>
						{posts.length === 0 && (
							<div className="empty-post-main">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
									(empty) => {
										return (
											<div className="empty-post-container">
												<div className="empty-votes">
													<i
														className={`fa-solid fa-arrow-up `}
													></i>
													<i
														className={`fa-solid fa-arrow-down `}
													></i>
												</div>
											</div>
										);
									}
								)}
								<div className="empty-post-text-container-flex">
									<div className="empty-post-text">
										<div className="empty-post-big-text">
											There are no posts in this subreddit
										</div>
										<div className="empty-post-small-text">
											{" "}
											Be the first to till this fertile
											land.
										</div>
										{currentUser && (
											<Link
												to={{
													pathname: `/user/${currentUser.username}/submit`,
													state: {
														postSubId: sub.id,
													},
												}}
												className="new-post-button-container"
											>
												<button
													className="new-post-button"
													style={{ width: "200px" }}
												>
													New Post
												</button>
											</Link>
										)}
									</div>
								</div>
							</div>
						)}
						<div className="subreddit-info">
							{/* <div> */}
							<div>
								<SubredditInfoCard
									sub={sub}
									title="About Community"
								>
									<SubredditInfoAbout></SubredditInfoAbout>
								</SubredditInfoCard>
							</div>
							<div>
								<SubredditInfoCard
									sub={sub}
									title={`r/${sub.name} Rules`}
								>
									<SubredditInfoRules></SubredditInfoRules>
								</SubredditInfoCard>
							</div>
							<div>
								<SubredditInfoCard sub={sub} title="Moderator">
									{/* <SubredditInfoModerator
										sub={sub}
									></SubredditInfoModerator> */}
								</SubredditInfoCard>
							</div>

							{/* </div> */}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Subreddit;
