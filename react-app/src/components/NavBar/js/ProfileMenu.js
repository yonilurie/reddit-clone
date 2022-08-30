// import LogoutButton from "../../auth/LogoutButton";
import { logout } from "../../../store/session";
import { useDispatch } from "react-redux";

const ProfileMenu = ({ showMenu, user }) => {
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
	};
	return (
		<div className="profile-menu-container">
			{showMenu && (
				<div className="profile-menu">
					<div className="profile-menu-el">
						<i class="fa-solid fa-scroll"></i>
						<div>About</div>
					</div>
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
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
