import React, { useState, useEffect } from "react";

import DeleteCommentModal from "./DeleteCommentModal";

import "./css/index.css";

function CommentMenu({ comment, editComment, setEditComment }) {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);

	// Add event listener to page so menu closes if user clicks anywhere else
	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<div className="post-menu-container">
			<div
				className="edit"
				onClick={() => setShowMenu((showMenu) => !showMenu)}
			>
				{!editComment && <i className="fa-solid fa-ellipsis"></i>}
			</div>
			{showMenu && (
				<div className="post-menu">
					<div
						className="post-menu-option"
						onClick={() => {
							setShowMenu(false);
							setShowModal(true);
						}}
					>
						<i className="fa-solid fa-trash"></i>
						<div>Delete</div>
					</div>
					<div
						className="post-menu-option"
						onClick={() => {
							setShowMenu(false);
							setEditComment(true);
						}}
					>
						<i className="fa-solid fa-pencil"></i>
						<div>Edit</div>
					</div>
				</div>
			)}
			<DeleteCommentModal
				comment={comment}
				showModal={showModal}
				setShowModal={setShowModal}
			></DeleteCommentModal>
		</div>
	);
}

export default CommentMenu;
