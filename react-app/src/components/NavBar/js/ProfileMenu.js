import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { logout } from "../../../store/session";

import LoginFormModal from "../../auth/LoginFormModal";
import SubredditModal from "../../SubredditModal";

//The profile menu in the navbar
const ProfileMenu = ({
	showMenu,
	setShowMenu,
	user,
	showModal,
	setShowModal,
	action,
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [showSubModal, setShowSubModal] = useState(false);

	//If modal is active, disable scroll
	useEffect(() => {
		if (showModal || showSubModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal, showSubModal]);

	//Add event listener to page to close profile menu if user clicks
	//anywhere else on the page
	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu, setShowMenu]);

	const onLogout = async (e) => {
		await dispatch(logout());
		history.push("/");
	};

	return (
		<div className="profile-menu-container">
			<LoginFormModal
				showModal={showModal}
				setShowModal={setShowModal}
				action={action}
			></LoginFormModal>
			<SubredditModal
				showSubModal={showSubModal}
				setShowSubModal={setShowSubModal}
			></SubredditModal>
			{showMenu && (
				<div className="profile-menu">
					{user && (
						<>
							<div className="profile-menu-section-title">
								<i className="fa-regular fa-circle-user"></i>
								<div>My Stuff</div>
							</div>

							<Link
								to={`/user/${user.username}/submitted`}
								className="profile-menu-el user-links"
							>
								Profile
							</Link>

							{/* <Link
								to={`/settings`}
								className="profile-menu-el user-links"
							>
								User Settings
							</Link> */}
							<div
								className="profile-menu-el"
								onClick={() => setShowSubModal(true)}
							>
								<i className="fa-brands fa-reddit-alien"></i>
								<div>Create a community</div>
							</div>
						</>
					)}
					<Link to={`/about`} className="profile-menu-el">
						<i className="fa-solid fa-scroll"></i>
						<div>About</div>
					</Link>

					{user ? (
						<div className="profile-menu-el" onClick={onLogout}>
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
							<div>Logout</div>
						</div>
					) : (
						<div
							className="auth-container-profile-menu profile-menu-el"
							onClick={() => setShowModal(true)}
						>
							<div>
								<i className="fa-regular fa-circle-user"></i>
							</div>
							<div>Log in </div>
						</div>
					)}
					<div className="no-copyright">
						2022 Reddit Clone. No rights reserved
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
