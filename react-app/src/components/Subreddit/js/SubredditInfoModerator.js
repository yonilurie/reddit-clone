function SubredditInfoModerator({ sub }) {
	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-moderator">
					<div>{sub.owner.username}</div>
				</div>
			)}
		</>
	);
}

export default SubredditInfoModerator;
