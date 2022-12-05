import React from 'react'
import { useState } from "react";

import RuleContainer from "./RuleContainer";
import RuleModal from "./RuleModal";

//Subreddit edit page rules contaniner
function SubredditRules({ sub }) {
	const [showRuleModal, setShowRuleModal] = useState(false);

	const rules = sub.rules.split("%");

	return (
		<div className="rules-main-container">
			<RuleModal
				showRuleModal={showRuleModal}
				setShowRuleModal={setShowRuleModal}
				rules={sub.rules}
				newRule={true}
				subredditId={sub.id}
			></RuleModal>
			<div className="add-rule-container">
				<button
					className={`submit-post-button rules ${
						rules.length >= 16 ? "disabled" : ""
					}`}
					onClick={() => setShowRuleModal(true)}
					disabled={rules.length >= 16}
				>
					Add Rule
				</button>
			</div>
			<div className="edit-subreddit-main-content rules">
				<h2 className="edit-subreddit-header rules">Rules</h2>
				<h3 className="rules-header-details">
					These are rules that visitors must follow to participate.
					<br></br>
					(Maximum 15 Rules )
				</h3>
				{sub.rules && rules && (
					<div className="edit-subreddit-rules-map">
						{rules.map((rule, index) => {
							if (!rule) return null;
							const [ruleTitle, ruleDetail] = rule.split(":");
							return (
								<RuleContainer
									ruleTitle={ruleTitle}
									ruleDetail={ruleDetail}
									index={index}
									key={index}
									rules={sub.rules}
									subredditId={sub.id}
									newRule={false}
								></RuleContainer>
							);
						})}
					</div>
				)}
				{!sub.rules && (
					<div className="no-rules-placeholder">
						<div className="no-rules-placeholder-content-container">
							<i className="fa-solid fa-scroll rules"></i>
							No Rules Yet
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SubredditRules;
