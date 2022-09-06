function SubredditLoading() {
	return (
		<div className="loading-post-container">
			<div className="loading-left">
				<div className="votes-container">
					<div className="vote upvote">
						<i className="fa-solid fa-arrow-up loading-arrow"></i>
					</div>
					<div className="votes"></div>
					<div className="vote downvote">
						<i className="fa-solid fa-arrow-down loading-arrow "></i>
					</div>
				</div>
			</div>
			<div className="loading-right">
				<div className="loading-top">
					<div className="loading-header"></div>
					<div className="loading-subheader"></div>
				</div>
				<div className="loading-middle">
					<div className="loading-post"></div>
				</div>
				<div className="loading-bottom">
					<div className="loading-interactions"></div>
				</div>
			</div>
		</div>
	);
}

export default SubredditLoading;
