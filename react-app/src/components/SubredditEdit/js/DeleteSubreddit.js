import { Modal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {deleteASubreddit, authenticate} from '../../../store/session'

function DeleteSubreddit({ sub }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const deleteSub = () => {
        dispatch(deleteASubreddit(sub.id, sub.name)).then(data => {
            dispatch(authenticate())
        }).then(data => {
            history.push(`/user/${sub.owner.username}`)
        })
        return
    }
	return (
		<div className="delete-sub-container-main">
			<div className="delete-sub-container">
				<h2 className="delete-sub-title">DELETE YOUR SUBREDDIT</h2>
				<h3 className="delete-sub-subtitle">Are your sure?</h3>
				<div className="delete-sub-details">
					Deleting your subreddit is PERMANENT. All associated posts
					will also be deleted and can never be retrieved...
				</div>
				<div className="delete-sub-confirmation">
					Do you still wish to delete r/{sub.name}?
				</div>
				<button
					className="delete-sub-button"
					onClick={() => setShowDeleteModal(true)}
				>
					DELETE r/{sub.name}
				</button>
			</div>

			{showDeleteModal && (
				<Modal onClose={() => setShowDeleteModal(false)}>
					<div className="sub-delete-modal-container">
						<div className="delete-sub-final-confirm">
							Are you really sure you want to delete r/{sub.name}?
						</div>
						<button
							className="sub-delete-cancel-button"
							onClick={() => setShowDeleteModal(false)}
						>
							Never mind
						</button>
						<button className="sub-delete-confirm-button" onClick={deleteSub}>
							Yes, Delete r/{sub.name}
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default DeleteSubreddit;
