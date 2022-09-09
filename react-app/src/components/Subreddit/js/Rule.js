import { useState } from "react";
function Rule({ sub, idx, ruleTitle, ruleDetail }) {
	const [showRuleDetail, setShowRuleDetail] = useState(false);
	return (
		<div className="sub-rules-container" key={idx + 1}>
			<div
				className={`sub-rule-title has-rule-detail`}
				onClick={() =>
					setShowRuleDetail((showRuleDetail) => !showRuleDetail)
				}
			>
				{" "}
				{idx + 1}. {ruleTitle}
			</div>
			<div className={`sub-rule-detail ${showRuleDetail ? "" : "hide"}`}>
				- {ruleDetail ? ruleDetail : "No details"}
			</div>
		</div>
	);
}

export default Rule;
