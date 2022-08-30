// import LogoutButton from "../../auth/LogoutButton";
import { logout } from "../../../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProfileMenu = ({ showMenu, user }) => {
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
	};
	return (
		<div className="profile-menu-container">
			{showMenu && (
				<div className="profile-menu">
					{user && (
						<>
							<div className="profile-menu-section-title">
								<i class="fa-regular fa-circle-user"></i>
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
						</>
					)}
					<Link to={`/about`} className="profile-menu-el">
						<i class="fa-solid fa-scroll"></i>
						<div>About</div>
					</Link>

					{user ? (
						<div className="profile-menu-el">
							<i class="fa-solid fa-arrow-right-from-bracket"></i>
							<div onClick={onLogout}>Logout</div>
						</div>
					) : (
						<div className="auth-container-profile-menu profile-menu-el">
							<div>
								<i class="fa-regular fa-circle-user"></i>
							</div>
							<div>Sign up or log in </div>
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
