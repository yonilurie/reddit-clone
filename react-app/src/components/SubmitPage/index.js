import PostForm from "../PostForm";
import "./css/index.css";
import UserInfoCard from "../Profile/js/UserInfoCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import NoPermission from "../ErrorPages/NoPermission";

function SubmitPage() {
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);
	const { username } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!username) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/u/${username}`);
			const user = await response.json();
			if (currentUser.id !== user.id) {
				// history.push("/");
				return;
			} else {
				setUser(user);
			}
		})();
	}, [username]);

	return (
		<>
			{user ? (
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
			) : (
				<NoPermission></NoPermission>
			)}
		</>
	);
}

export default SubmitPage;
