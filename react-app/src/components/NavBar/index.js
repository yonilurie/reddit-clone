import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProfileMenu from "./js/ProfileMenu";
import SearchBar from "./js/SearchBar";
import SubscribedSubreddits from "../SubscribedSubreddits";

import logo from "../../images/teddir-logo.png";

import * as sessionActions from "../../store/session";
import "./css/index.css";

//The navbar, with login/signup/logout functionality as well as search bar
function NavBar() {
	const dispatch = useDispatch();

	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [action, setAction] = useState("Log In");

	const user = useSelector((state) => state.session.user);

	return (
		<nav className="nav-container">
			<div className="logo-and-subscribed">
				<NavLink to="/" exact={true}>
					<img src={logo} className="nav-logo" alt="logo"></img>
				</NavLink>
				{user && <SubscribedSubreddits></SubscribedSubreddits>}
			</div>

			<SearchBar></SearchBar>
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
						{/* <button
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
						</button> */}
					</div>
				)}
				{user && (
					<Link
						to={`/user/${user.username}/submit`}
						className="submit-post-link"
					>
						<i className="fa-regular fa-thin fa-square-plus fa-plus"></i>
					</Link>
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
										alt="profile"
									></img>
								</div>
								<div className="profile-menu-user-stats">
									<div className="profile-menu-username">
										{user.username}
									</div>
									{/* <div className="profile-menu-karma">
										{user.karma} karma
									</div> */}
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
						setAction={setAction}
					></ProfileMenu>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;