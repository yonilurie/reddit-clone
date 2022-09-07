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
	newRule,
}) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState(ruleTitle || "");
	const [detail, setDetail] = useState(ruleDetail || "");

	useEffect(() => {
		if (!newRule && ruleTitle) setTitle(ruleTitle);
		if (!newRule && ruleDetail) setDetail(ruleDetail);
	}, []);

	const onSubmit = () => {
		if (!title) return;
		const formData = new FormData();
		let formattedRule = `${title}:${detail}`;
		let subRules = rules;
		let newRules = ruleTitle
			? subRules.replace(`${ruleTitle}:${ruleDetail}%`, formattedRule)
			: (subRules += formattedRule += "%");
		formData.append("rules", newRules);
		formData.append("subreddit_id", subredditId);

		dispatch(editARule(formData, subredditId)).then((data) => {
			dispatch(authenticate());
		});
		setTitle("");
		setDetail("");
		setShowRuleModal(false);
	};

	console.log(title);
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
								maxLength="100"
							></input>
							<div className="characters-left">
								{title.length === 99
									? `1 character remaining`
									: `${
											100 - title.length
									  } characters remaining`}
							</div>
						</div>
						<div className="rule-modal-input detail">
							<label htmlFor="rule-input-detail">Rule</label>
							<input
								id="rule-input-details"
								value={detail}
								onChange={(e) => setDetail(e.target.value)}
								maxLength="100"
							></input>
							<div className="characters-left">
								{detail.length === 99
									? `1 character remaining`
									: `${
											100 - detail.length
									  } characters remaining`}
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
								className={`submit-post-button rules ${
									!title ? "disabled" : ""
								}`}
								onClick={onSubmit}
							>
								{ruleTitle ? "Add Rule" : "Update Rule"}
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default RuleModal;
