import { Modal } from "../../../context/Modal";
import { deleteAPost, getSubInfo, getPosts } from "../../../store/subreddits";
import { authenticate } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeletePostModal({ showModal, setShowModal, post }) {
	const dispatch = useDispatch();
	const history = useHistory();
	return (
		<>
			{showModal && (
				<Modal>
					<div className="confirm-delete-modal">
						<div className="confirm-delete-post-title">
							<div>Delete post?</div>
							<div
								onClick={() => setShowModal(false)}
								className="exit-delete"
							>
								X
							</div>
						</div>
						<div className="confirm-delete-post-text">
							Are you sure you want to delete your post? You can't
							undo this.
						</div>
						<div className="confirm-delete-post-buttons-container">
							<div className="confirm-delete-post-buttons">
								<button
									onClick={() => setShowModal(false)}
									className="cancel-button"
								>
									Cancel
								</button>
								<button
									onClick={async () => {
										await dispatch(
											deleteAPost(
												post.id,
												post.user.username,
												post.subreddit_name
											)
										);
										dispatch(
											getSubInfo(post.subreddit_name)
										);
										dispatch(getPosts(post.subreddit_name));
										dispatch(authenticate());
										setShowModal(false);
										history.push(
											`/user/${post.user.username}/submitted`
										);
									}}
									className="submit-post-button"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

export default DeletePostModal;
