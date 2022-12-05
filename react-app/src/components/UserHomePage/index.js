import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//User home page with content form their followed subreddits
function UserHomePage() {
	const user = useSelector((state) => state.session.user);

	return <div></div>;
}

export default UserHomePage;
