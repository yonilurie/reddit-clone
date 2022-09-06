function SubredditInfoRules({ sub }) {
	const rules = sub.rules.split("%");
	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-rules">
					{sub.rules && rules.length > 0 ? (
						rules.map((rule, idx) => {
							console.log(rule);
							const [ruleTitle, ruleDetail] = rule.split(":");
							return (
								<div key={idx + 1} className="rule">
									{" "}
									{idx + 1}. {ruleTitle}
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
