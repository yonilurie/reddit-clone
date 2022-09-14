import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/index.css";
import DeleteCommentModal from "./DeleteCommentModal";

function CommentMenu({comment, setEditComment}) {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<>
			<div className="post-menu-container">
				<div
					className="edit"
					onClick={() => {
						setShowMenu((showMenu) => !showMenu);
					}}
				>
					<i className="fa-solid fa-ellipsis"></i>
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
								setEditComment(true)
							}}
						>
							<i className="fa-solid fa-pencil"></i>
							<div>Edit</div>
						</div>
					</div>
				)}
				<DeleteCommentModal comment={comment} showModal={showModal} setShowModal={setShowModal}></DeleteCommentModal>
			</div>
		</>
	);
}

export default CommentMenu;
