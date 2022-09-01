import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginFormModal from "../auth/LoginFormModal";
import ProfileMenu from "./js/ProfileMenu";
import * as sessionActions from "../../store/session";
import "./css/index.css";

function NavBar() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(true);
	const [action, setAction] = useState("");
	const user = useSelector((state) => state.session.user);

	return (
		<nav className="nav-container">
			<div>
				<NavLink to="/" exact={true}>
					<img
						src="https://logos-download.com/wp-content/uploads/2016/06/Reddit_logo_full_1.png"
						className="nav-logo"
					></img>
				</NavLink>
			</div>

			<div className="login-signup-menu">
				{!user && (
					<div className="login-signup-container">
						<div
							className="login-button"
							onClick={() =>
								dispatch(
									sessionActions.login(
										"demo@aa.io",
										"password"
									)
								)
							}
						>
							Demo User
						</div>
						<button
							className="login-button"
							onClick={() => {
								setAction("Log In");
								setShowModal(true);
							}}
							action="login"
						>
							Log In
						</button>
						<button
							className="signup-button"
							onClick={() => {
								setAction("Sign Up");
								setShowModal(true);
							}}
						>
							Sign Up
						</button>
					</div>
				)}
				<div
					className={`profile-toggle ${showMenu ? "active" : ""}`}
					onClick={() => setShowMenu((showMenu) => !showMenu)}
				>
					{user ? (
						<>
							<div className="profile-menu-user-info">
								<div className="profile-menu-profile-image-container">
									<img
										src={user.profile_image}
										className="profile-menu-profile-image"
									></img>
								</div>
								<div className="profile-menu-user-stats">
									<div className="profile-menu-username">
										{user.username}
									</div>
									<div className="profile-menu-karma">
										{user.karma} karma
									</div>
								</div>
							</div>
							<i className="fa-solid fa-angle-down"></i>
						</>
					) : (
						<>
							<i className="fa-regular fa-user"></i>
							<i className="fa-solid fa-angle-down"></i>
						</>
					)}
					<ProfileMenu
						showMenu={showMenu}
						setShowMenu={setShowMenu}
						user={user}
						showModal={showModal}
						setShowModal={setShowModal}
						action={action}
					></ProfileMenu>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
