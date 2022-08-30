import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SubredditPostCard from "./SubredditPostCard";

const Subreddit = () => {
	const { subreddit } = useParams();
	const [sub, setSub] = useState({});
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (!subreddit) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/r/${subreddit}`);
			const subredditInfo = await response.json();
			setSub(subredditInfo);
			console.log(subredditInfo);
		})();
		(async () => {
			const response = await fetch(`/api/r/${subreddit}/posts`);
			const postsArr = await response.json();
			setPosts(postsArr);
			console.log(postsArr);
		})();
	}, [subreddit]);

	if (sub.error) {
		return sub.error;
	}

	return (
		<>
			<div>{sub.display_name ? sub.display_name : sub.name}</div>
			<div>r/{sub.name}</div>
			<div>
				<div>-----Posts-----</div>
				{posts.map((post) => (
					<div className="single-post" key={post.id}>
						{post.title}
					</div>
				))}
			</div>
		</>
	);
};

export default Subreddit;
