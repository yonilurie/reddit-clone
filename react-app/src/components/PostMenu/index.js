import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/index.css";
import DeletePostModal from "./js/DeleteModal";

//Post menu that is available on a users created posts
function PostMenu({ post }) {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);

	//Add event listener to turn off menu if user clicks anywhere besides the menu
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
					onClick={() => setShowMenu((showMenu) => !showMenu)}
				>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
				{showMenu && (
					<div className="post-menu">
						{post.type_of_post === "text" && (
							<Link
								className="post-menu-option"
								to={{
									pathname: `/r/${post.subreddit_name}/${post.id}`,
									state: { edit: true },
								}}
							>
								<i className="fa-solid fa-pencil"></i>
								<div>Edit</div>
							</Link>
						)}
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
