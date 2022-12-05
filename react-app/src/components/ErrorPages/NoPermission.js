import React from 'react'
import "./index.css";
import { useHistory } from "react-router-dom";
function NoPermission() {
	const history = useHistory();
	return (
		<div className="fill-white">
			<div className="no-permission-container">
				<div className="no-permission">
					<h3 className="no-permission-message">
						Sorry, You do not have permission to view this page.
					</h3>
					<button
						className="go-home-button"
						onClick={() => history.push("/")}
					>
						Go Home
					</button>
				</div>
			</div>
		</div>
	);
}

export default NoPermission;
