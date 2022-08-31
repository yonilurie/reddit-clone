import { Link } from "react-router-dom";
import { useState } from "react";

function UserInfoCard({ user }) {
	// const [showPostModal, setShowPostModal] = useState(false);

	return (
		<>
			{user && (
				<div className="user-info-card">
					{user.banner_image ? null : (
						<div className="blue-block"></div>
					)}

					<div className="user-profile-page-profile-image-container">
						<img
							src={user.profile_image}
							className="user-profile-page-profile-image"
						></img>
					</div>
					<div className="user-profile-username">
						<div>/u{user.username}</div>
						<Link to={`/user/${user.username}/settings`}>
							<i className="fa-solid fa-gear"></i>
						</Link>
					</div>

					<div className="karma-cakeday-container">
						<div className="karma-container">
							<div>Karma</div>
							<div className="karma">1</div>
						</div>
						<div className="cakeday-container">
							<div>Cake day</div>
							<div className="cakeday">
								{user.created_at
									.split(" ")
									.splice(0, 4)
									.join(" ")}
							</div>
						</div>
					</div>
					<div className="social-links">
						<button className="add-social-links-button">
							<i className="fa-solid fa-plus"></i>
							<div> Add Social Link</div>
						</button>
					</div>
					<Link
						to={`/user/${user.username}/submit`}
						className="new-post-button-container"
					>
						<button className="new-post-button">New Post</button>
					</Link>
					{/* </div> */}
				</div>
			)}
		</>
	);
}

export default UserInfoCard;
