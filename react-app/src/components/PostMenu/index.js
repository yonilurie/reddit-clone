import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/index.css";
import DeletePostModal from "./js/DeleteModal";
function PostMenu({ post }) {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<div className="post-menu-container">
				<div
					className="edit"
					onClick={() => setShowMenu((showMenu) => !showMenu)}
				>
					...
				</div>
				{showMenu && (
					<div className="post-menu">
						<Link
							className="post-menu-option"
							to={{
								pathname: `/r/${post.subreddit_name}/${post.id}/${post.title}`,
								state: { edit: true },
							}}
						>
							<i class="fa-solid fa-pencil"></i>
							<div>Edit</div>
						</Link>
						<div
							className="post-menu-option"
							onClick={() => {
								setShowMenu(false);
								setShowModal(true);
							}}
						>
							<i class="fa-solid fa-trash"></i>
							<div>Delete</div>
						</div>
					</div>
				)}
				<DeletePostModal
					showModal={showModal}
					setShowModal={setShowModal}
					post={post}
				></DeletePostModal>
			</div>
		</>
	);
}

export default PostMenu;
