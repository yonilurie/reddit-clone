import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SubredditPostCard from "./js/SubredditPostCard";
import "./css/index.css";
import SubredditInfoCard from "./js/SubredditInfoCard";
import SubredditBanner from "./js/SubredditBanner";

const Subreddit = () => {
	const { subreddit } = useParams();
	const [sub, setSub] = useState(null);
	const [posts, setPosts] = useState([]);

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

	return (
		<div className="subreddit-outer-container">
			{sub && (
				<>
					<SubredditBanner sub={sub} />
					<div className="subreddit-inner-container">
						<div className="subreddit-posts">
							{posts.length > 0 &&
								posts
									.map((post) => (
										<SubredditPostCard
											post={post}
											key={post.id}
										></SubredditPostCard>
									))}
						</div>

						<SubredditInfoCard sub={sub}></SubredditInfoCard>
					</div>
				</>
			)}
		</div>
	);
};

export default Subreddit;
