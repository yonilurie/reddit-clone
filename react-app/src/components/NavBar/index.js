import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileMenu from "./js/ProfileMenu";
import "./css/index.css";

function NavBar() {
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

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
			<div className="nav-login-signup-container">
				<div className="login-button">
					<NavLink to="/login" exact={true}>
						Login
					</NavLink>
				</div>
				<div className="signup-button">
					<NavLink to="/sign-up" exact={true}>
						Sign Up
					</NavLink>
				</div>
			</div>

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
						<i class="fa-solid fa-angle-down"></i>
					</>
				) : (
					<>
						<i class="fa-regular fa-user"></i>
						<i class="fa-solid fa-angle-down"></i>
					</>
				)}
				<ProfileMenu showMenu={showMenu} user={user}></ProfileMenu>
			</div>
		</nav>
	);
}

export default NavBar;
