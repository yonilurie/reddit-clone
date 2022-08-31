function TextForm({ text, setText }) {
	return (
		<div className="text-form-container">
			<textarea
                placeholder="Text(optional)"
                className="text-area"
				value={text}
				onChange={(e) => setText(e.target.value)}
				minLength="1"
				maxLength="10000"
			></textarea>
		</div>
	);
}

export default TextForm;
