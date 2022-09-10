import { useEffect } from "react";

function TextForm({ text, setText, post }) {
	useEffect(() => {
		if (post) {
			setText(post.text);
		}
	}, [post]);

	const resizeInput = (e) => {
		let tempText = e.target.value.replace("  ", " ");

		setText(tempText);
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	return (
		<div className="text-form-container">
			{text.length > 0 && <label htmlFor="post-text">Text</label>}
			<textarea
				placeholder="Text(optional)"
				id="post-text"
				className="text-area"
				value={text}
				maxLength="2000"
				onChange={(e) => resizeInput(e)}
			></textarea>
		</div>
	);
}

export default TextForm;
