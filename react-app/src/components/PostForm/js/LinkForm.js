function LinkForm({ link, setLink, setValidURL }) {
	const resizeInput = (e) => {
		try {
			const URLCheck = new URL(e.target.value);
			setValidURL(true);
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
				placeholder="Url"
				value={link}
				onChange={(e) => resizeInput(e)}
			></textarea>
		</div>
	);
}

export default LinkForm;
