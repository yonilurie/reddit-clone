import { useState } from "react";
import RuleModal from "./RuleModal";
function RuleContainer({ ruleTitle, ruleDetail, index }) {
	const [showRuleDetail, setShowRuleDetail] = useState(false);
	const [showRuleModal, setShowRuleModal] = useState(false);
	return (
		<div className="rule-container" key={index + 1}>
			<div className="rule-title">
				<div className="sub-rule">
					{index + 1} {ruleTitle}
				</div>
				{ruleDetail && (
					<div className="rule-interact">
						<div
							className="edit-rule"
							onClick={() => setShowRuleModal(true)}
						>
							edit rule
						</div>
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
			<RuleModal
				showRuleModal={showRuleModal}
				setShowRuleModal={setShowRuleModal}
			></RuleModal>
		</div>
	);
}

export default RuleContainer;
