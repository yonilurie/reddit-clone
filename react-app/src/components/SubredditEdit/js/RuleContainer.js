import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editARule, authenticate } from "../../../store/session";
import { editSubRules } from "../../../store/subreddits";

import RuleModal from "./RuleModal";

//Container for subreddit rules in edit page
function RuleContainer({ ruleTitle, ruleDetail, index, rules, subredditId }) {
	const dispatch = useDispatch();

	const [showRuleDetail, setShowRuleDetail] = useState(false);
	const [showRuleModal, setShowRuleModal] = useState(false);

	//Deletes a rule
	const deleteARule = () => {
		let newRules = rules.replace(`${ruleTitle}:${ruleDetail}%`, "");
		const formData = new FormData();
		formData.append("subreddit_id", subredditId);
		formData.append("rules", newRules);
		dispatch(editARule(formData, subredditId)).then((data) => {
			dispatch(editSubRules(data));
			dispatch(authenticate());
		});
	};

	return (
		<div className="rule-container" key={index + 1}>
			<div className="rule-title">
				<div className="sub-rule">
					<span className="rule-index-edit">{index + 1}</span>{" "}
					{ruleTitle}
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
						className="edit-rule toggle-rule-detail"
						onClick={() => setShowRuleModal(true)}
					>
						<i className="fa-solid fa-pencil"></i>
					</div>
					<div
						onClick={() => deleteARule()}
						className="toggle-rule-detail"
					>
						<i className="fa-solid fa-trash-can interactive"></i>
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
