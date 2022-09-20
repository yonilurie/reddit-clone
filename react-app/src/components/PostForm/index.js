import { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import TextForm from "./js/TextForm";
import LinkForm from "./js/LinkForm";
import ImageForm from "./js/ImageForm";

import "./css/index.css";

import {
	createAPostImage,
	createAPost,
	getUserInfo,
	getSubInfo,
	getPosts,
} from "../../store/subreddits";

function PostForm() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const { username } = useParams();

	const [subredditsList, setSubredditsList] = useState([]);
	const [subredditId, setSubredditId] = useState(1);
	const [typeOfPost, setTypeOfPost] = useState("text");
	const [title, setTitle] = useState("");
	// const [tags, setTags] = useState("");
	const [link, setLink] = useState("");
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);
	const [validURL, setValidURL] = useState(true);

	//get the info for the user for the side bar
	useEffect(() => {
		dispatch(getUserInfo(username));
	}, [dispatch, username]);

	// Get the list of all subreddits for the subreddit selector
	useEffect(() => {
		if (!subredditsList.length) {
			const subreddits = async () => {
				const res = await fetch("/api/r/list-all");
				return await res.json();
			};
			const res = subreddits();
			res.then((data) => {
				setSubredditsList(data);
			});
		}
		let postSubId = null;
		// If the user was redirected from another subreddit then set the subreddit
		// to the one held in the location state
		try {
			if (location.state.postSubId) {
				postSubId = location.state.postSubId;
				setSubredditId(postSubId);
				history.replace();
			}
		} catch (e) {}

		if (subredditsList.length > 0 && !subredditId) {
			setSubredditId(subredditsList[0].id);
		}
	}, [username, location, history, subredditId, subredditsList]);

	// Resize the title input field as user types and remove white space
	const resizeInput = (e) => {
		let tempTitle = e.target.value.replace("  ", " ");
		setTitle(tempTitle);
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	// For changing subreddit to post to
	const setSubredditInfo = (e) => {
		setSubredditId(e.target.value);
	};

	//Submit function for submitting a new post
	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("subreddit_id", subredditId);
		formData.append("title", title);
		formData.append("type_of_post", typeOfPost);
		// if (tags) formData.append("tags", tags);
		if (typeOfPost === "link") formData.append("link", link);
		if (typeOfPost === "text") formData.append("text", text);

		//There is a different route for image posting since this involved AWS s3
		if (typeOfPost === "image") {
			formData.append("image", image);
			dispatch(createAPostImage(subredditId, formData)).then((data) => {
				dispatch(getSubInfo(data.subreddit_name)).then((subData) => {
					dispatch(getPosts(subData.name)).then((postsData) => {
						history.replace();
						return history.push(
							`/r/${data.subreddit_name}/${data.id}`
						);
					});
				});
			});
		} else {
			dispatch(createAPost(subredditId, formData)).then((data) => {
				dispatch(getSubInfo(data.subreddit_name)).then((subData) => {
					dispatch(getPosts(subData.name)).then((postsData) => {
						history.replace();
						return history.push(
							`/r/${data.subreddit_name}/${data.id}`
						);
					});
				});
			});
		}
	};

	return (
		<div className="post-form-container">
			<div className="page-title-container">
				<h3 className="page-title">Create a post</h3>
			</div>

			<div className="choose-subreddit-container">
				Subreddit
				<select
					name="subreddits"
					className="choose-subreddit"
					value={subredditId}
					onChange={setSubredditInfo}
				>
					{/* Map out the list of subreddits as options on a select field */}
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
					{/* based on the type of post chosen based on the tabs, different user inputs will show */}
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
							placeholder="Title(Required)"
							value={title}
							onChange={(e) => {
								resizeInput(e);
							}}
							maxLength="300"
							id="post-title"
						></textarea>
					</div>
					{/* Different types of post inputs */}
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
					<div className="submit-post-container">
						<div
							className="cancel-button"
							onClick={() => history.push(`/user/${username}/submitted`)}
						>
							Cancel
						</div>
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
				</form>
			</div>
		</div>
	);
}

export default PostForm;
