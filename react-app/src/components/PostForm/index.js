import { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextForm from "./js/TextForm";
import LinkForm from "./js/LinkForm";
import "./css/index.css";
import ImageForm from "./js/ImageForm";
import {
	createAPostImage,
	createAPost,
	getUserInfo,
} from "../../store/subreddits";

function PostForm() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const { username } = useParams();

	const [subredditsList, setSubredditsList] = useState([]);
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
	useEffect(() => {
		dispatch(getUserInfo(username));
	}, []);
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
			dispatch(createAPostImage(subredditId, formData)).then((data) => {
				history.push(
					`/r/${data.subreddit_name}/${data.id}/${data.title}`
				);
			});
		} else {
			dispatch(createAPost(subredditId, formData)).then((data) => {
				history.push(
					`/r/${data.subreddit_name}/${data.id}/${data.title}`
				);
			});
		}
	};

	useEffect(async () => {
		const subreddits = await fetch("/api/r/list-all");
		const data = await subreddits.json();
		setSubredditsList(data);
		setSubredditId(data[0].id);
		let postSubId;
		try {
			if (location.state.postSubId) {
				postSubId = location.state.postSubId;
				location.state = {};
			}
		} catch (e) {}
		if (postSubId) {
			setSubredditId(postSubId);
		}
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
								typeOfPost === "text" ? "selected" : ""
							}`}
							onClick={() => setTypeOfPost("text")}
						>
							<i className="fa-solid fa-align-justify"></i>
							<div>Post</div>
						</div>
						<div
							className={`input-type ${
								typeOfPost === "image" ? "selected" : ""
							}`}
							onClick={() => setTypeOfPost("image")}
						>
							<i className="fa-regular fa-image"></i>
							<div>Images</div>
						</div>
						<div
							className={`input-type ${
								typeOfPost === "link" ? "selected" : ""
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
