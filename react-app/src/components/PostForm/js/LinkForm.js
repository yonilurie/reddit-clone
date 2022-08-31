function LinkForm({ link, setLink }) {
	return (
		<div className="text-form-container">
			<input
				type="url"
				placeholder="Url"
				value={link}
				onChange={(e) => setLink(e.target.value)}
			></input>
		</div>
	);
}

export default LinkForm;
