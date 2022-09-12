import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { createASub } from "../../store/subreddits";
import { authenticate } from "../../store/session";
import "./index.css";
function SubredditModal({ showSubModal, setShowSubModal }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const [newSubredditName, setNewSubredditName] = useState("");
	const [errors, setErrors] = useState(null);

	const currentUser = useSelector((state) => state.session.user);

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (!newSubredditName || !currentUser.id) return null;

		formData.append("subreddit_name", newSubredditName);
		formData.append("owner_id", currentUser.id);
		dispatch(createASub(formData)).then((data) => {
			if (data.errors) return setErrors(data.errors);
			dispatch(authenticate());
			setNewSubredditName("");
			setShowSubModal(false);
			return history.push(`/r/${data.name}`);
		});
	};

	const removeWhiteSpace = (input, setterCb) => {
		const str = input.split(" ").join("");
		setterCb(str);
	};
	return (
		<div>
			{showSubModal && (
				<Modal
					onClose={() => {
						setNewSubredditName("");
						setShowSubModal(false);
					}}
				>
					<form
						className="create-subreddit-modal"
						onSubmit={onSubmit}
					>
						<div className="modal-title-subreddit">
							<div>Create a community</div>
							<div
								onClick={() => {
									setNewSubredditName("");
									setShowSubModal(false);
								}}
								className="exit"
							>
								X
							</div>
						</div>
						<div className="modal-subheader">
							<h3>Name</h3>
							<div>
								Community names including capitalization cannot
								be changed.
							</div>
							<div style={{ textAlign: "center" }}>
								Only use letters
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
								minLength="2"
								maxLength="21"
								required={true}
								pattern="[A-Za-z]+"
								onInvalid={(e) =>
									e.target.setCustomValidity(
										"Subreddit name must be between 2 and 21 characters, using only letters"
									)
								}
								onInput={(e) => e.target.setCustomValidity("")}
								value={newSubredditName}
								onChange={(e) =>
									removeWhiteSpace(
										e.target.value,
										setNewSubredditName
									)
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
							<div
								onClick={() => {
									setNewSubredditName("");
									setShowSubModal(false);
								}}
								className="cancel-button"
							>
								Cancel
							</div>
							<button
								className={`submit-subreddit-button ${
									newSubredditName.length === 0
										? "disabled"
										: ""
								}`}
								// onClick={onSubmit}
								disabled={newSubredditName.length === 0}
							>
								Create Community
							</button>
						</div>
						{errors && <div className="error">{errors}</div>}
					</form>
				</Modal>
			)}
		</div>
	);
}

export default SubredditModal;
