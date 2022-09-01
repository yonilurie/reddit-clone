import PostForm from "../PostForm";
import "./css/index.css";
import UserInfoCard from "../Profile/js/UserInfoCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function SubmitPage() {
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);
	const { username } = useParams();
	const [user, setUser] = useState({});

	useEffect(() => {
		if (!username) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/u/${username}`);
			const user = await response.json();
			if (currentUser.id !== user.id) {
				return history.push("/");
			}
			setUser(user);
		})();
	}, [username]);

	return (
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
	);
}

export default SubmitPage;
