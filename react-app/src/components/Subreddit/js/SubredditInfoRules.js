import Rule from "./Rule";
import React from "react";
// Card with subreddit rules
function SubredditInfoRules({ sub }) {
	const rules = sub.rules.split("%");
	if (!sub.name) return null;
	return (
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
	);
}

export default SubredditInfoRules;
