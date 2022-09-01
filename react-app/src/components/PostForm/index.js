import { Modal } from "../../context/Modal";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import TextForm from "./js/TextForm";
import LinkForm from "./js/LinkForm";
import "./css/index.css";
import ImageForm from "./js/ImageForm";

function PostForm() {
	const history = useHistory();
	const { username } = useParams();
	const [subredditsList, setSubredditsList] = useState([]);
	// const [subreddit, setSubreddit] = useState("");
	const [subredditId, setSubredditId] = useState(0);
	const [typeOfPost, setTypeOfPost] = useState("text");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [link, setLink] = useState("");
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);
	const [validURL, setValidURL] = useState(true);

	const resizeInput = (e) => {
		setTitle(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	const setSubredditInfo = (e) => {
		setSubredditId(e.value);
	};

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
			const res = await fetch(`/api/r/${subredditId}/post/image`, {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
		} else {
			const response = await fetch(`/api/r/${subredditId}/post`, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
		}

		history.push(`/user/${username}/submitted`);
	};

	useEffect(async () => {
		const subreddits = await fetch("/api/r/list-all");
		const data = await subreddits.json();
		setSubredditsList(data);
		setSubredditId(data[0].id);
	}, [username]);

	return (
		<div className="post-form-container">
			<div className="page-title-container">
				<h3 className="page-title">Create a post</h3>
			</div>

			<div className="choose-subreddit-container">
				<select
					name="subreddits"
					className="choose-subreddit"
					value={subredditId}
					onChange={(e) => setSubredditInfo(e.target)}
				>
					{subredditsList.length > 0 &&
						subredditsList.map((s) => {
							return (
								<option value={s.id} key={s.id} id={s.id}>
									{s.name}
								</option>
							);
						})}
				</select>
			</div>
			<div className="post-form-flex">
				<form className="post-form" onSubmit={(e) => onSubmit(e)}>
					{/* <div className="post-form"> */}
					<div className="input-types">
						<div
							className={`input-type ${
								typeOfPost === "text" ? "selected" : ''
							}`}
							onClick={() => setTypeOfPost("text")}
						>
							<i className="fa-solid fa-align-justify"></i>
							<div>Post</div>
						</div>
						<div
							className={`input-type ${
								typeOfPost === "image" ? "selected" : ''
							}`}
							onClick={() => setTypeOfPost("image")}
						>
							<i className="fa-regular fa-image"></i>
							<div>Images</div>
						</div>
						<div
							className={`input-type ${
								typeOfPost === "link" ? "selected" : ''
							}`}
							onClick={() => setTypeOfPost("link")}
						>
							<i className="fa-solid fa-link"></i>
							<div>Link</div>
						</div>
					</div>
					<div className="post-title">
						<div className="character-count">
							{title.length > 0 ? `${title.length}/300` : "0/300"}
						</div>
						<textarea
							className="title"
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => resizeInput(e)}
							maxLength="300"
						></textarea>
					</div>
					{typeOfPost === "text" && (
						<TextForm setText={setText} text={text}></TextForm>
					)}
					{typeOfPost === "link" && (
						<LinkForm
							setLink={setLink}
							link={link}
							setValidURL={setValidURL}
						></LinkForm>
					)}
					{typeOfPost === "image" && (
						<ImageForm
							setImage={setImage}
							image={image}
						></ImageForm>
					)}

					{/* <div>tags</div> */}
					<div className="submit-post-container">
						<button
							className="cancel-button"
							onClick={() => history.push(`/user/${username}`)}
						>
							Cancel
						</button>
						<button
							className={`submit-post-button ${
								(typeOfPost === "text" && !title) ||
								(typeOfPost === "image" &&
									(!image || !title)) ||
								(typeOfPost === "link" &&
									(!link || !title || !validURL))
									? "disabled"
									: ""
							} `}
							disabled={
								(typeOfPost === "text" && !title) ||
								(typeOfPost === "image" &&
									(!image || !title)) ||
								(typeOfPost === "link" &&
									(!link || !title || !validURL))
							}
						>
							Post
						</button>
					</div>
					{/* </div> */}
				</form>
			</div>
		</div>
	);
}

export default PostForm;
