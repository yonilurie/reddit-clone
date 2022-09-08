import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHomePosts } from "../../store/subreddits";
import HomepagePostCard from "./HomepagePostCard";
import SubredditBanner from "../Subreddit/js/SubredditBanner";
import "./index.css";
function HomePage() {
	const dispatch = useDispatch();
	const [subs, setSubs] = useState([]);
	const [posts, setPosts] = useState([]);

	const sub = { display_name: "all", name: "all" };
	const all = useSelector((state) => state.subreddits.all);
	const user = useSelector((state) => state.session.user);
	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/r/list-five`);
			const subredditInfo = await response.json();
			setSubs(subredditInfo);
		})();
		if (!all) {
			dispatch(getHomePosts()).then((data) => {});
		}
	}, [all, dispatch]);

	useEffect(() => {
		if (posts && all) {
			setPosts(Object.values(all.posts));
		}
	}, [dispatch, user, all, posts]);

	return (
		<div className="home-page-container-main">
			<SubredditBanner sub={sub}></SubredditBanner>
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
