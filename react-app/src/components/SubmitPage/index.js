import PostForm from "../PostForm";
import "./css/index.css";
import UserInfoCard from "../Profile/js/UserInfoCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoPermission from "../ErrorPages/NoPermission";

function SubmitPage() {
	const { username } = useParams();

	const [user, setUser] = useState(null);

	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		if (!username) return;
		(async () => {
			const response = await fetch(`/api/u/${username}`);
			const user = await response.json();
			if (currentUser.username === username) setUser(user);
		})();
	}, [username, currentUser]);

	return (
		<>
			{user && (
				<div className="submit-page-container">
					{user.username && (
						<>
							<PostForm></PostForm>
							<div className="user-info-card-container-submit">
								<UserInfoCard user={user}></UserInfoCard>
							</div>
						</>
					)}
				</div>
			)}
			{currentUser.username !== username && <NoPermission></NoPermission>}
		</>
	);
}

export default SubmitPage;
