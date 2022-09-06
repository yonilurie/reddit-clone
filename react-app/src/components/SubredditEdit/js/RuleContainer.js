import { useState } from "react";
import RuleModal from "./RuleModal";
function RuleContainer({
	ruleTitle,
	ruleDetail,
	index,
	rules,
	subredditId,
	newRule,
}) {
	const [showRuleDetail, setShowRuleDetail] = useState(false);
	const [showRuleModal, setShowRuleModal] = useState(false);
	return (
		<div className="rule-container" key={index + 1}>
			<div className="rule-title">
				<div className="sub-rule">
					{index + 1} {ruleTitle}
				</div>
				<div className="rule-interact">
					{ruleDetail && (
						<div
							onClick={() =>
								setShowRuleDetail(
									(showRuleDetail) => !showRuleDetail
								)
							}
							className="toggle-rule-detail"
						>
							<i className="fa-solid fa-up-right-and-down-left-from-center"></i>
						</div>
					)}
					<div
						className="edit-rule"
						onClick={() => setShowRuleModal(true)}
					>
						<i className="fa-solid fa-pencil"></i>
					</div>
				</div>
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
			<RuleModal
				showRuleModal={showRuleModal}
				setShowRuleModal={setShowRuleModal}
				ruleTitle={ruleTitle}
				ruleDetail={ruleDetail}
				rules={rules}
				subredditId={subredditId}
			></RuleModal>
		</div>
	);
}

export default RuleContainer;
