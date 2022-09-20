import { useState } from "react";
import { useDispatch } from "react-redux";

import { editCommunitySettings } from "../../../store/session";
import { editSubCommunitySettings } from "../../../store/subreddits";

//Component for community settings, (Display name and description)
function CommunitySettings({ sub }) {
	const dispatch = useDispatch();

	const [subDisplayName, setSubDisplayName] = useState(sub.display_name);
	const [subDescription, setSubDescription] = useState(sub.description);
	const [color, setColor] = useState(sub.color);

	//Resize textarea input as user types
	const resizeInput = (e) => {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	//handle submit for both display name and description
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("display_name", subDisplayName);
		formData.append("description", subDescription);
		formData.append("color", color);
		dispatch(editCommunitySettings(formData, sub.id)).then((data) => {
			dispatch(editSubCommunitySettings(data));
			alert("Changes Submitted");
		});
	};

	const removeWhiteSpace = (input, setterCb) => {
		setterCb(input.split("  ").join(" "));
	};

	return (
		<div className="community-container">
			<div className="add-rule-container">
				<button className="submit-post-button rules" onClick={onSubmit}>
					Save Changes
				</button>
			</div>
			<div className="community-settings-container-main">
				<div className="community-settings-container">
					<h2 className="community-settings-title">
						Community settings
					</h2>
					<h4 className="community-settings-subtitle">
						Community profile
					</h4>
					<div className="community-settings-input-container">
						<label htmlFor="sub-name">Community name</label>
						<input
							id="sub-name"
							value={subDisplayName}
							placeholder="Community display name will default to subreddits name"
							maxLength="50"
							onChange={(e) =>
								removeWhiteSpace(
									e.target.value,
									setSubDisplayName
								)
							}
						></input>
						<div
							className={`${
								subDisplayName.length === 50 ? "limit" : ""
							}`}
						>
							{subDisplayName.length === 49
								? `1 character remaining`
								: `${
										50 - subDisplayName.length
								  } characters remaining`}
						</div>
					</div>
					<div className="community-settings-input-container">
						<label htmlFor="sub-description">
							Community Description
						</label>
						<textarea
							id="sub-description"
							placeholder="Community description will be left blank"
							value={subDescription}
							maxLength="500"
							onChange={(e) => {
								removeWhiteSpace(
									e.target.value,
									setSubDescription
								);
								resizeInput(e);
							}}
						></textarea>
						<div
							className={`${
								subDescription.length === 500 ? "limit" : ""
							}`}
						>
							{subDescription.length === 499
								? `1 character remaining`
								: `${
										500 - subDescription.length
								  } characters remaining`}
						</div>
					</div>
					<div className="community-settings-input-container">
						<label htmlFor="sub-color">Subreddit Color</label>
						<input
							id="sub-color"
							type="color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						></input>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CommunitySettings;
