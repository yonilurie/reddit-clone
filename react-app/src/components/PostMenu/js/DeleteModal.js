import { Modal } from "../../../context/Modal";
import { deleteAPost} from '../../../store/subreddits'
import { authenticate} from '../../../store/session'
import { useDispatch} from 'react-redux'

function DeletePostModal({ showModal, setShowModal, post }) {
    const dispatch = useDispatch()
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
								<button onClick={() => setShowModal(false)}>
									Cancel
								</button>
                                <button onClick={async () => {
                                    await dispatch(deleteAPost(post.id, post.user.username))
                                    dispatch(authenticate())
                                    setShowModal(false)
                                }}>
									Delete Post
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
