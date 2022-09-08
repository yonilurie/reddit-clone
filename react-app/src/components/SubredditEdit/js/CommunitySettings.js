import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommunitySettings } from "../../../store/session";
import { editSubCommunitySettings } from "../../../store/subreddits";

function CommunitySettings({ sub }) {
	const dispatch = useDispatch();
	const [subDisplayName, setSubDisplayName] = useState(sub.display_name);
	const [subDescription, setSubDescription] = useState(sub.description);
	const resizeInput = (e) => {
		setSubDescription(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("display_name", subDisplayName);
		formData.append("description", subDescription);
		dispatch(editCommunitySettings(formData, sub.id)).then((data) => {
			console.log(data)
			dispatch(editSubCommunitySettings(data));
			alert("Changes Submitted");
		});
	};

	const removeWhiteSpace = (input, setterCb) => {
		const str = input.split("  ").join(" ");
		setterCb(str);
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
							maxLength="100"
							onChange={(e) =>
								removeWhiteSpace(
									e.target.value,
									setSubDisplayName
								)
							}
						></input>
						<div
							className={`${
								subDisplayName.length === 100 ? "limit" : ""
							}`}
						>
							{subDisplayName.length === 99
								? `1 character remaining`
								: `${
										100 - subDisplayName.length
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
							onChange={(e) =>
								removeWhiteSpace(
									e.target.value,
									setSubDescription
								)
							}
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
				</div>
			</div>
		</div>
	);
}

export default CommunitySettings;
