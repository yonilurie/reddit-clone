import { logout } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginFormModal from "../../auth/LoginFormModal";
import SubredditModal from "../../SubredditModal";
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
	const onLogout = async (e) => {
		await dispatch(logout());
		history.push("/");
	};
	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);

	// useEffect(() => {
	// 	if (!showModal) return;
	// 	const closeModal = () => setShowModal(false);
	// 	document.addEventListener("click", closeModal);
	// 	return () => document.removeEventListener("click", closeModal);
	// }, [showModal]);

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);
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
								to={`/user/${user.username}`}
								className="profile-menu-el user-links"
							>
								Profile
							</Link>

							<Link
								to={`/settings`}
								className="profile-menu-el user-links"
							>
								User Settings
							</Link>
							<div
								className="profile-menu-el"
								onClick={() => setShowSubModal(true)}
							>
								<div>Logo</div>
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
						<div className="auth-container-profile-menu profile-menu-el">
							<div>
								<i className="fa-regular fa-circle-user"></i>
							</div>
							<div onClick={() => setShowModal(true)}>
								Sign up or log in{" "}
							</div>
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
