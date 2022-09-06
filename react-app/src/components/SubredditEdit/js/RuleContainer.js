import { useState } from "react";
function RuleContainer({ ruleTitle, ruleDetail, index }) {
	const [showRuleDetail, setShowRuleDetail] = useState(false);
	return (
		<div className="rule-container" key={index + 1}>
			<div className="rule-title">
				<div className="sub-rule">
					{index + 1} {ruleTitle}
				</div>
				{ruleDetail && (
					<div
						onClick={() =>
							setShowRuleDetail(
								(showRuleDetail) => !showRuleDetail
							)
						}
						className="toggle-rule-detail"
					>
						Expand
					</div>
				)}
			</div>
			{ruleDetail && (
				<div
					className={`sub-rule-details ${
						showRuleDetail ? "" : "hide"
					}`}
				>
					{ruleDetail}
				</div>
			)}
		</div>
	);
}

export default RuleContainer;
