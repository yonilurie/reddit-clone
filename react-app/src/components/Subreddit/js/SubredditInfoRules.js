function SubredditInfoRules({ sub }) {
	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-rules">
					{sub.rules.length > 0 ? (
						sub.rules.map((rule, idx) => {
							return (
								<div key={rule} className="rule">
									{" "}
									{idx}.{rule}
								</div>
							);
						})
					) : (
						<div className="rule">
							This community has not set any rules yet
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default SubredditInfoRules;
