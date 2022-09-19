import { useEffect } from "react";

//Text form for text post description
function TextForm({ text, setText, post }) {
	// For auto-resizing the textarea as user types
	const resizeInput = (e) => {
		let tempText = e.target.value.replace("  ", " ");
		setText(tempText);
		e.target.style.height = e.target.scrollHeight + "px";
		if (tempText.length === 0) {
			e.target.style.height = "auto";
		}
	};
	//Change the inital size of text field if user is editing a post
	const initialTextSize = () => {
		const textInputArea = document.getElementById("post-text");
		textInputArea.style.height = textInputArea.scrollHeight + "px";
	};

	//If a post is passed in as a prop, laod the textarea with the posts description
	useEffect(() => {
		if (post) setText(post.text);
	}, [post, setText]);

	//Change initial size of textarea
	useEffect(() => {
		initialTextSize();
	}, [text]);

	return (
		<div className="text-form-container">
			{/* {text.length > 0 && (
				<label htmlFor="post-text">
					Text (Optional, Maximum length 2000 characters)
				</label>
			)} */}
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
