import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./css/index.css";
const NavBar = () => {
	return (
		<nav className="nav-container">
			<div>
				<NavLink to="/" exact={true} activeClassName="active">
					<img src="https://logos-download.com/wp-content/uploads/2016/06/Reddit_logo_full_1.png" className="nav-logo"></img>
				</NavLink>
			</div>
			<div className="nav-login-signup-container">
				{" "}
				<div className="login-button">
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</div>
				<div className="signup-button">
					<NavLink
						to="/sign-up"
						exact={true}
						activeClassName="active"
					>
						Sign Up
					</NavLink>
				</div>
			</div>
			<div>
				<LogoutButton />
			</div>
		</nav>
	);
};

export default NavBar;
