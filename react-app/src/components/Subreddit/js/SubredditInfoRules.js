import Rule from "./Rule";
function SubredditInfoRules({ sub }) {
	const rules = sub.rules.split("%");

	return (
		<>
			{sub.name && (
				<div className="subreddit-info-card-rules">
					{sub.rules && rules.length > 0 ? (
						rules.map((rule, idx) => {
							if (!rule) return null;
							const [ruleTitle, ruleDetail] = rule.split(":");
							return (
								<Rule
									sub={sub}
									ruleTitle={ruleTitle}
									ruleDetail={ruleDetail}
									idx={idx}
									key={idx}
								></Rule>
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
