import { useState } from "react";
import RuleContainer from "./RuleContainer";
import RuleModal from "./RuleModal";
function SubredditRules({ sub }) {
	const rules = sub.rules.split("%");
	console.log(rules);
	const [showRuleModal, setShowRuleModal] = useState(false);
	const [editedRules, setEditedRules] = useState(rules);
	return (
		<div>
			<RuleModal
				showRuleModal={showRuleModal}
				setShowRuleModal={setShowRuleModal}
				rules={sub.rules}
			></RuleModal>
			<div className="add-rule-container">
				<button
					className="submit-post-button rules"
					onClick={() => setShowRuleModal(true)}
				>
					Add Rule
				</button>
			</div>
			<div className="edit-subreddit-main-content rules">
				<h2 className="edit-subreddit-header rules">Rules</h2>
				<h3 className="rules-header-details">
					These are rules that visitors must follow to participate.
					They can be used as reasons to report or ban posts,
					comments, and users. Communities can have a maximum of 15
					rules.
				</h3>
				{sub.rules && rules && (
					<div className="edit-subreddit-rules-map">
						{rules.map((rule, index) => {
							console.log(rule);
							const [ruleTitle, ruleDetail] = rule.split(":");
							return (
								<RuleContainer
									ruleTitle={ruleTitle}
									ruleDetail={ruleDetail}
									index={index}
									key={index}
									rules={sub.rules}
									subredditId={sub.id}
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
