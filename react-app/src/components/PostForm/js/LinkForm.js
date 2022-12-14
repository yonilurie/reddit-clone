import React from 'react'
function LinkForm({ link, setLink, setValidURL }) {

	//Auto resize the textarea as user types
	const resizeInput = (e) => {
		//Sets valid url as user types, if it is false the submit button will be disabled
		try {
			const URLCheck = new URL(e.target.value);
			if (URLCheck) setValidURL(true);
			if (URLCheck.protocol !== "https:") {
				setValidURL(false);
			}
		} catch (e) {
			setValidURL(false);
		}
		setLink(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};
	return (
		<div className="text-form-container">
			<textarea
				className="link-input"
				placeholder="Please enter a URL to an external page prefixed with https://"
				value={link}
				onChange={(e) => resizeInput(e)}
				id="link-input"
			></textarea>
		</div>
	);
}

export default LinkForm;