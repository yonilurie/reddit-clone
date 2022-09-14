import { Modal } from "../../context/Modal";
import { deleteAComment } from "../../store/subreddits";
import { authenticate } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeleteCommentModal({ showModal, setShowModal, comment }) {
	const dispatch = useDispatch();
    const history = useHistory();
    
	return (
		<>
			{showModal && (
				<Modal>
					<div className="confirm-delete-modal">
						<div className="confirm-delete-post-title">
							<div>Delete Comment</div>
							<div
								onClick={() => setShowModal(false)}
								className="exit-delete"
							>
								X
							</div>
						</div>
						<div className="confirm-delete-post-text">
							Are you sure you want to delete your comment?
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
											deleteAComment(comment.id)
										).then((data) =>
											dispatch(authenticate())
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

export default DeleteCommentModal;
