import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SubredditPostCard from "./js/SubredditPostCard";
import "./css/index.css";
import SubredditInfoCard from "./js/SubredditInfoCard";
import SubredditBanner from "./js/SubredditBanner";
import SubredditInfoAbout from "./js/SubredditInfoAbout";
import SubredditInfoRules from "./js/SubredditInfoRules";
import SubredditInfoModerator from "./js/SubredditInfoModerator";
import { useDispatch, useSelector } from "react-redux";
import { getSubInfo, getPosts } from "../../store/subreddits";
const Subreddit = () => {
	const dispatch = useDispatch();
	const { subreddit } = useParams();
	const [sub, setSub] = useState(null);
	const [loaded, setLoaded] = useState(true);
	const subreddits = useSelector((state) => state.subreddits);
	const currentUser = useSelector((state) => state.session.user);
	useEffect(() => {
		if (!subreddits[subreddit]) {
			dispatch(getSubInfo(subreddit));
			dispatch(getPosts(subreddit));
			setLoaded(false);
		}

		setSub(subreddits[subreddit]);
	}, [dispatch, subreddits]);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoaded(true);
		}, 250);
		return () => clearTimeout(timeout);
	}, []);
	return (
		<div className="subreddit-outer-container">
			{loaded && sub && (
				<>
					<SubredditBanner sub={sub} />
					<div className="subreddit-inner-container">
						<div className="subreddit-posts">
							{sub &&
								sub.posts &&
								Object.values(sub.posts).length > 0 &&
								Object.values(sub.posts).map((post) => (
									<SubredditPostCard
										post={post}
										key={post.id}
									></SubredditPostCard>
								))}
						</div>
						{loaded && !sub.posts && (
							<div className="empty-post-main">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
									(empty) => {
										return (
											<div
												className="empty-post-container"
												key={empty}
											>
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
								<SubredditInfoCard
									sub={sub}
									title="Moderator"
								></SubredditInfoCard>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Subreddit;
