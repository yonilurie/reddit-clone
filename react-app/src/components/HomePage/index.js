import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getHomePosts, toggleMembership, getSubMembers } from "../../store/subreddits";
import { authenticate } from "../../store/session";

import HomepagePostCard from "./HomepagePostCard";
import SubredditBanner from "../Subreddit/js/SubredditBanner";

import "./index.css";

//This page will load posts from five random subreddits
function HomePage() {
	const dispatch = useDispatch();
	const [subs, setSubs] = useState([]);
	const [posts, setPosts] = useState([]);

	//Subreddit information for home page
	const sub = { display_name: "all", name: "all" };
	const all = useSelector((state) => state.subreddits.all);
	const user = useSelector((state) => state.session.user);

	//Toggles user joining a subreddit
	const toggleJoin = (subredditId, subredditName) => {
		dispatch(toggleMembership(subredditId)).then((data) => {
			dispatch(authenticate()).then(() => {
				dispatch(getSubMembers(subredditName));
			});
		});
	};

	//gets five random subreddits for the reccomended communities
	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/r/list-five`);
			const subredditInfo = await response.json();
			setSubs(subredditInfo);
		})();
		if (!all) {
			dispatch(getHomePosts()).then(() => {});
		}
	}, [all, dispatch]);

	//Sets rnadom posts in state
	useEffect(() => {
		if (posts && all) {
			setPosts(Object.values(all.posts).reverse());
		}
	}, [dispatch, user, all]);

	return (
		<div className="home-page-container-main">
			<SubredditBanner sub={sub}></SubredditBanner>
			{!user && (
				<div className="splash-info-container">
					<div className="splash-info-content">
						Welcome to Teddir! Login or Sign Up to create a
						community for users to post in, make a post, or vote on
						content.
					</div>
					<Link
						to="/about"
						className="splash-info-content splash-about"
					>
						About
					</Link>
				</div>
			)}
			<div className="home-page-container">
				<div className="home-page-feed">
					{posts &&
						posts.length > 0 &&
						posts.map((post) => {
							return (
								<HomepagePostCard
									key={post.id}
									post={post}
								></HomepagePostCard>
							);
						})}

					{posts && !posts.length && (
						<div className="homepage-no-posts-container">
							<div className="homepage-no-posts-text">
								No random posts loaded, try refreshing the page!
							</div>
						</div>
					)}
				</div>
				{subs.length > 0 && (
					<div className="home-sub-list">
						<div className="reccomended-title">
							<div className="reccomended-title-text">
								Communities to Check Out
							</div>
						</div>
						<div className="reccomended-subs-container">
							{subs.map((sub, idx) => {
								return (
									<div
										className="reccomended-container"
										key={sub.name}
									>
										<div className="reccomended-content">
											<div className="reccomended-sub-number">
												{idx + 1}
											</div>
											<Link
												className="sub-home-link"
												to={`/r/${sub.name}`}
											>
												<div className="reccomended-sub-name">
													r/{sub.name}
												</div>
											</Link>
											<button
												className="subreddit-join"
												onClick={() => {
													if (!user) {
														return;
													}

													toggleJoin(sub.id, sub.name);
												}}
											>
												{user &&
													user.member[sub.id] &&
													"Joined"}
												{user &&
													!user.member[sub.id] &&
													"Join"}
												{!user && "Join"}
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default HomePage;
