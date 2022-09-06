import { useEffect } from "react";

function TextForm({ text, setText, post }) {
	useEffect(() => {
		if (post) {
			setText(post.text);
		}
	}, [post]);

	const resizeInput = (e) => {
		setText(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	return (
		<div className="text-form-container">
			<textarea
				placeholder="Text(optional)"
				className="text-area"
				value={text}
				maxLength="10000"
				onChange={(e) => resizeInput(e)}
			></textarea>
		</div>
	);
}

export default TextForm;
