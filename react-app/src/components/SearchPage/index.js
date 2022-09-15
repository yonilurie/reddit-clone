import { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import subreddits from "../../store/subreddits";
import { getTimeElapsed } from "../../util/index.js";
import "./index.css";
function SearchPage() {
	const history = useHistory();
	const search = useLocation().search;
	const s = new URLSearchParams(search).get("s");
	const [type, setType] = useState("Posts");
	const [searchResult, setSearchResult] = useState(null);

	const executeSearch = async (query) => {
		const response = await fetch(`/api/search?s=${query}`);
		const data = await response.json();
		return data;
	};

	useEffect(async () => {
		if (s) {
			const result = await executeSearch(s);
			console.log(result);
			setSearchResult(result);
		} else {
			setSearchResult({});
		}
	}, [search]);
	const setTab = (e) => {
		setType(e.target.innerText);
	};
	return (
		<div className="search-page-main-container">
			<div className="search-page-tabs">
				<div
					className={`search-page-tab ${
						type === "Posts" ? "search-selected" : ""
					}`}
					onClick={setTab}
				>
					Posts
				</div>
				<div
					className={`search-page-tab ${
						type === "Communities" ? "search-selected" : ""
					}`}
					onClick={setTab}
				>
					Communities
				</div>
				<div
					className={`search-page-tab ${
						type === "People" ? "search-selected" : ""
					}`}
					onClick={setTab}
				>
					People
				</div>
			</div>
			<div className="search-page-results">
				{/* <div>Users</div> */}
				{/* {searchResult &&
				Object.values(searchResult.users).length > 0 &&
				Object.values(searchResult.users).map((user) => {
					return <div key={user.username}>{user.username}</div>;
				})} */}
				{type === "Posts" && (
					<div className="search-posts-outer-container">
						<div className="search-posts-left">
							{type === "Posts" &&
								searchResult &&
								Object.values(searchResult).length > 0 &&
								Object.values(searchResult.posts).length > 0 &&
								Object.values(searchResult.posts).map(
									(post) => {
										return (
											<div
												key={post.title}
												className="search-post-card"
											>
												<div className="search-post-top">
													<div className="search-post-subreddit-info">
														<div>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 20 20"
																className="search-post-sub"
															>
																<path
																	d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"
																	className="sub-icon"
																></path>
															</svg>
														</div>
														<div className="search-post-subreddit">
															r/
															{
																post.subreddit_name
															}
														</div>
													</div>
													<div className="search-dot">
														{"•"}{" "}
													</div>
													<div className="search-posted-by">
														Posted by{" "}
														<Link
															to={`/user/${post.user.username}`}
														>
															u/
															{post.user.username}
														</Link>{" "}
														{getTimeElapsed(
															post.created_at
														)}
													</div>
												</div>
												<div className="search-post-middle">
													<div className="search-post-title">
														{post.title}
													</div>
													{post.image && (
														<a href={post.image}>
															<img
																src={post.image}
																className="search-post-image"
															></img>
														</a>
													)}
													{post.text && <div></div>}
													{post.link && <div></div>}
												</div>
												<div className="search-post-bottom">
													<div className="search-post-votes">
														{post.votes.total > 0
															? post.votes.total
															: 0}{" "}
														upvotes
													</div>
													<div className="search-post-comment-count">
														{post.comment_count}{" "}
														comments
													</div>
												</div>
											</div>
										);
									}
								)}
						</div>
						<div className="search-posts-right"></div>
						{/* <div>Subreddits</div>
			{searchResult &&
				Object.values(searchResult.subreddits).length > 0 &&
				Object.values(searchResult.subreddits).map((subreddit) => {
					return <div key={subreddit.name}>{subreddit.name}</div>;
				})} */}
					</div>
				)}

				{type === "Communities" &&
					searchResult &&
					Object.values(searchResult).length > 0 &&
					Object.values(searchResult.subreddits).length > 0 &&
					Object.values(searchResult.subreddits).map((sub) => {
						return (
							<div
								key={sub.name}
								className="search-page-subreddit"
							>
								<Link to={`/r/${sub.name}` } className="search-subreddit-left">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										className="search-post-sub"
									>
										<path
											d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"
											className="sub-icon"
										></path>
									</svg>
								</Link>
								<Link to={`/r/${sub.name}` } className="search-subreddit-center">
									<div>r/{sub.name}</div>
									<div className="search-sub-description">
										{sub.description
											? `${sub.description}`
											: ""}
									</div>
								</Link>
								<div className="search-subreddit-right">
									<button className="subreddit-join">
										Join
									</button>
								</div>
							</div>
						);
					})}
				{type === "People" &&
					searchResult &&
					Object.values(searchResult).length > 0 &&
					Object.values(searchResult.users).length > 0 &&
					Object.values(searchResult.users).map((user) => {
						return <div key={user.username}>{user.username}</div>;
					})}
			</div>
		</div>
	);
}

export default SearchPage;
