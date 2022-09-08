import { Modal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editARule, authenticate } from "../../../store/session";
import { editSubRules } from "../../../store/subreddits";
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

	const onSubmit = (e) => {
		e.preventDefault();
		if (!title) return;
		const formData = new FormData();
		let formattedRule = `${title}:${detail}%`;
		let subRules = rules;
		let newRules = ruleTitle
			? subRules.replace(`${ruleTitle}:${ruleDetail}%`, formattedRule)
			: (subRules += formattedRule);
		formData.append("rules", newRules);
		formData.append("subreddit_id", subredditId);

		dispatch(editARule(formData, subredditId)).then((data) => {
			console.log(data);
			dispatch(editSubRules(data));
			dispatch(authenticate());
		});
		setTitle("");
		setDetail("");
		setShowRuleModal(false);
	};

	const removeWhiteSpace = (input, setterCb) => {
		// let str = input.replace(/[%/\\?&]/, "");
		let str = input.split("  ").join(" ");
		setterCb(str);
	};
	return (
		<div>
			{showRuleModal && (
				<Modal onClose={() => setShowRuleModal(false)}>
					<form className="rule-modal-container" onSubmit={onSubmit}>
						<div className="rule-modal-header">
							<h3 className="rule-modal-title">Rule</h3>

							<div
								className="exit"
								onClick={() => setShowRuleModal(false)}
							>
								X
							</div>
						</div>
						<div>
							Rule and Rule detail may only contain alphanumeric
							values, commas, and periods.
						</div>
						<div className="rule-modal-input rule">
							<label htmlFor="rule-input-rule">Rule</label>
							<input
								id="rule-input-rule"
								value={title}
								onChange={(e) =>
									removeWhiteSpace(e.target.value, setTitle)
								}
								maxLength="100"
								pattern="[A-Za-z0-9\s\d.\d,]+"
							></input>
							<div
								className={`characters-left ${
									title.length === 100 ? "limit" : ""
								}`}
							>
								{title.length === 99
									? `1 character remaining`
									: `${
											100 - title.length
									  } characters remaining`}
							</div>
						</div>
						<div className="rule-modal-input detail">
							<label htmlFor="rule-input-detail">
								Rule detail
							</label>
							<input
								id="rule-input-details"
								value={detail}
								onChange={(e) =>
									removeWhiteSpace(e.target.value, setDetail)
								}
								maxLength="100"
								pattern="[A-Za-z0-9\s\d.\d,]+"
							></input>
							<div
								className={`characters-left ${
									detail.length === 100 ? "limit" : ""
								}`}
							>
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

							<button
								className={`submit-post-button rules ${
									!title ? "disabled" : ""
								}`}
								// onClick={onSubmit}
							>
								{ruleTitle ? "Update Rule" : "Add Rule"}
							</button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	);
}

export default RuleModal;
