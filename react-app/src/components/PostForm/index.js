import { Modal } from "../../context/Modal";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextForm from "./js/TextForm";
import LinkForm from "./js/LinkForm";
import "./css/index.css";

function PostForm() {
	const history = useHistory();
	const [subredditsList, setSubredditsList] = useState([]);
	const [subredditId, setSubredditId] = useState(1);
	const [typeOfPost, setTypeOfPost] = useState("text");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [link, setLink] = useState("");
	const [text, setText] = useState("");
	const [] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		const post = {
			subreddit_id: subredditId,
			title: title,
			type_of_post: typeOfPost,
		};
		if (tags) {
			post["tags"] = tags;
		}
		if (link) {
			post["link"] = link;
		}
		if (text) {
			post["text"] = text;
		}

		const response = await fetch("/api/r/dogs/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(post),
		});

		const data = await response.json();
		console.log(data);
	};

	return (
		<div className="post-form-container">
			<form className="post-form" onSubmit={(e) => onSubmit(e)}>
				<div className="choose-subreddit-container">
					<select
						name="subreddits"
						className="choose-subreddit"
						value={subredditId}
						onChange={(e) => setSubredditId(e.target.value)}
					>
						<option value="1">dogs</option>
						<option value="2">cats</option>
						<option value="3">views</option>
						<option value="4">seattle</option>
						<option value="5">gaming</option>
						<option value="6">appacademy</option>
					</select>
				</div>
				<div className="post-form">
					<div className="input-types">
						<div
							onClick={() => setTypeOfPost("text")}
							className={`input-type ${
								typeOfPost === "text" ? "selected" : null
							}`}
						>
							Post
						</div>
						<div
							onClick={() => setTypeOfPost("image")}
							className={`input-type ${
								typeOfPost === "image" ? "selected" : null
							}`}
						>
							Images
						</div>
						<div
							onClick={() => setTypeOfPost("link")}
							className={`input-type ${
								typeOfPost === "link" ? "selected" : null
							}`}
						>
							Link
						</div>
					</div>
					<div className="post-title">
                        <input
                            className="title"
							type="text"
							placeholder="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
					{typeOfPost === "text" && (
						<TextForm setText={setText} text={text}></TextForm>
					)}
					{typeOfPost === "link" && (
						<LinkForm setLink={setLink} link={link}></LinkForm>
					)}

					<div>tags</div>
					<div className="submit-post-container">
						<button className="submit-post-button">Post</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default PostForm;
