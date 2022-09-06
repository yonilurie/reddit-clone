import { Modal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editARule, authenticate } from "../../../store/session";
import "../index.css";

function RuleModal({
	showRuleModal,
	setShowRuleModal,
	ruleTitle,
	ruleDetail,
	rules,
	subredditId,
}) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState(ruleTitle || "");
	const [detail, setDetail] = useState(ruleDetail || "");
	// useEffect(() => {
	// 	if (ruleTitle) setTitle(ruleTitle);
	// 	if (ruleDetail) setDetail(ruleDetail);
	// }, []);
	console.log(rules);
	const onSubmit = () => {
		const formData = new FormData();
		let formattedRule = `${title}:${detail}`;
		let subRules = rules;
		let newRules = subRules.replace(
			`${ruleTitle}:${ruleDetail}`,
			formattedRule
		);
		console.log(newRules);
		formData.append("rules", newRules);
		formData.append("subreddit_id", subredditId);
		dispatch(editARule(formData, subredditId)).then((data) => {
			dispatch(authenticate());
		});
	};

	return (
		<div>
			{showRuleModal && (
				<Modal onClose={() => setShowRuleModal(false)}>
					<div className="rule-modal-container">
						<div className="rule-modal-header">
							<h3 className="rule-modal-title">Rule</h3>
							<div
								className="exit"
								onClick={() => setShowRuleModal(false)}
							>
								X
							</div>
						</div>

						<div className="rule-modal-input rule">
							<label htmlFor="rule-input-rule">Rule</label>
							<input
								id="rule-input-rule"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							></input>
							<div className="characters-left">
								100 characters remaining
							</div>
						</div>
						<div className="rule-modal-input detail">
							<label htmlFor="rule-input-detail">Rule</label>
							<input
								id="rule-input-details"
								value={detail}
								onChange={(e) => setDetail(e.target.value)}
							></input>
							<div className="characters-left">
								100 characters remaining
							</div>
						</div>
						<div className="button-container">
							<div
								className="cancel-button"
								onClick={() => setShowRuleModal(false)}
							>
								Cancel
							</div>
							<div
								className="submit-post-button rules"
								onClick={onSubmit}
							>
								Add New Rule
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default RuleModal;
