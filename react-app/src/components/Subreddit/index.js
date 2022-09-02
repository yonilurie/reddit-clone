import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SubredditPostCard from "./js/SubredditPostCard";
import "./css/index.css";
import SubredditInfoCard from "./js/SubredditInfoCard";
import SubredditBanner from "./js/SubredditBanner";
import SubredditInfoAbout from "./js/SubredditInfoAbout";
import SubredditInfoRules from "./js/SubredditInfoRules";
import SubredditInfoModerator from "./js/SubredditInfoModerator";

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

	return (
		<div className="subreddit-outer-container">
			{sub && posts && (
				<>
					<SubredditBanner sub={sub} />
					<div className="subreddit-inner-container">
						<div className="subreddit-posts">
							{posts.length > 0
								? posts.map((post) => (
										<SubredditPostCard
											post={post}
											key={post.id}
										></SubredditPostCard>
								  ))
								: 
								<div className="no-posts"></div>
								}
						</div>

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
