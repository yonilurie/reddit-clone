function LinkForm({ link, setLink, setValidURL, post }) {
	const resizeInput = (e) => {
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
			{link.length > 0 && (
				<label htmlFor="link-input">
					URL to External Page with https: at beginning of URL (Required)
				</label>
			)}
			<textarea
				className="link-input"
				placeholder="Please enter a URL to an external page prefixed with https:// (Required)"
				value={link}
				onChange={(e) => resizeInput(e)}
				id="link-input"
			></textarea>
		</div>
	);
}

export default LinkForm;
