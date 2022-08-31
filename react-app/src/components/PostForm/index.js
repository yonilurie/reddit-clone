import { Modal } from "../../context/Modal";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextForm from "./js/TextForm";
import LinkForm from "./js/LinkForm";
import "./css/index.css";
import ImageForm from "./js/ImageForm";

function PostForm() {
	const history = useHistory();
	const { username } = useParams();
	const [subredditsList, setSubredditsList] = useState([]);
	const [subredditId, setSubredditId] = useState(1);
	const [typeOfPost, setTypeOfPost] = useState("text");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [link, setLink] = useState("");
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("subreddit_id", subredditId);
		formData.append("title", title);
		formData.append("type_of_post", typeOfPost);

		if (tags) {
			formData.append("tags", tags);
		}
		if (typeOfPost === "link") {
			formData.append("link", link);
		}
		if (typeOfPost === "text") {
			formData.append("text", text);
		}
		if (typeOfPost === "image") {
			formData.append("image", image);
			const res = await fetch("/api/r/dogs/post/image", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
		} else {
			const response = await fetch("/api/r/dogs/post", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
		}

		history.push(`/user/${username}/submitted`);
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
					{typeOfPost === "image" && (
						<ImageForm
							setImage={setImage}
							image={image}
						></ImageForm>
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
