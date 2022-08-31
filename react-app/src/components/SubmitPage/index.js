import PostForm from "../PostForm";
import "./css/index.css";
import UserInfoCard from "../Profile/js/UserInfoCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SubmitPage() {
	
	const { username } = useParams();
	const [user, setUser] = useState({});
	useEffect(() => {
		if (!username) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/u/${username}`);
			const user = await response.json();
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
