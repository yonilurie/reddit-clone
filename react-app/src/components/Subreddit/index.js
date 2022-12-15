import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSubInfo, getPosts } from "../../store/subreddits";

import SubredditPostCard from "./js/SubredditPostCard";
import SubredditInfoCard from "./js/SubredditInfoCard";
import SubredditBanner from "./js/SubredditBanner";
import SubredditInfoAbout from "./js/SubredditInfoAbout";
import SubredditInfoRules from "./js/SubredditInfoRules";
import SubredditLoading from "./SubredditLoading";
import AboutSideCard from "../About/AboutSideCard";

import "./css/index.css";

//Main compoonent for subreddit
const Subreddit = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { subreddit } = useParams();
	const [sub, setSub] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const subreddits = useSelector((state) => state.subreddits);
	const currentUser = useSelector((state) => state.session.user);

	//If the sub info is not in store then fetch it
	useEffect(() => {
		if (!subreddits[subreddit] || !subreddits[subreddit].id) {
			dispatch(getSubInfo(subreddit)).then((data) => {
				if (data.error) return history.push("/");
				dispatch(getPosts(subreddit)).then(() => {});
			});
		}
		setSub(subreddits[subreddit]);
		setLoaded(true);
	}, [dispatch, subreddits, subreddit, history]);

	//If subreddit is not loaded, create a timeout
	useEffect(() => {
		if (subreddits[subreddit]) return setLoaded(true);
		const timeout = setTimeout(() => setLoaded(true), 500);
		return () => clearTimeout(timeout);
	}, [subreddit, subreddits]);

	return (
		<div className="subreddit-outer-container">
			{sub && <SubredditBanner sub={sub} />}
			{sub && sub.id && (
				<div className="subreddit-inner-container">
					{sub.posts && Object.values(sub.posts).length > 0 && (
						<div className="subreddit-posts">
							{/* {sub &&
										sub.posts &&
										Object.values(sub.posts).length > 0 && */}
							{Object.values(sub.posts)
								.reverse()
								.map((post) => (
									<SubredditPostCard
										post={post}
										key={post.id}
									></SubredditPostCard>
								))}
						</div>
					)}
					{loaded &&
						sub.posts &&
						Object.keys(sub.posts).length === 0 && (
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
													style={{
														width: "200px",
													}}
												>
													New Post
												</button>
											</Link>
										)}
									</div>
								</div>
							</div>
						)}
					{!sub.posts && (
						<div className="loading-posts">
							<SubredditLoading></SubredditLoading>
							<SubredditLoading></SubredditLoading>
						</div>
					)}
					{loaded && (
						<div className="subreddit-info">
							<SubredditInfoCard
								sub={sub}
								title="About Community"
							>
								<SubredditInfoAbout></SubredditInfoAbout>
							</SubredditInfoCard>

							<SubredditInfoCard
								sub={sub}
								title={`r/${sub.name} Rules`}
							>
								<SubredditInfoRules></SubredditInfoRules>
							</SubredditInfoCard>

							<SubredditInfoCard
								sub={sub}
								title="Moderator"
							></SubredditInfoCard>

							<AboutSideCard sub={sub}></AboutSideCard>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Subreddit;
