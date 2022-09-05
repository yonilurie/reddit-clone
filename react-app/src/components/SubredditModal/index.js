import { useState } from "react";
import { Modal } from "../../context/Modal";
import "./index.css";
function SubredditModal({ showSubModal, setShowSubModal }) {
	const [newSubredditName, setNewSubredditName] = useState("");
	return (
		<div>
			{showSubModal && (
				<Modal onClose={() => setShowSubModal(false)}>
					<div className="create-subreddit-modal">
						<div className="modal-title">
							<div>Create a community</div>
							<div>X</div>
						</div>
						<div className="modal-subheader">
							<h3>Name</h3>
							<div>
								Community names including capitalization cannot
								be changed.
							</div>
						</div>

						<div className="subreddit-input-container">
							<label
								htmlFor="subreddit-input-name"
								className="subreddit-input-name-label"
							>
								r/
							</label>
							<input
								id="subreddit-input-name"
								className="subreddit-input-name"
								type="text"
								maxLength="21"
								value={newSubredditName}
								onChange={(e) =>
									setNewSubredditName(e.target.value)
								}
							></input>
						</div>
						<div
							className={`new-subreddit-characters ${
								newSubredditName.length === 21 ? "limit" : ""
							}`}
						>
							{newSubredditName.length === 20
								? `${
										21 - newSubredditName.length
								  } Character remaining`
								: `${
										21 - newSubredditName.length
								  } Characters remaining`}
						</div>

						<div className="button-container">
							<button
								onClick={() => setShowSubModal(false)}
								className="cancel-button"
							>
								Cancel
							</button>
							<button className="submit-subreddit-button">
								Create Community
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default SubredditModal;
