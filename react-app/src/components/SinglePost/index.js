import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import SubredditBanner from "../Subreddit/js/SubredditBanner";
import SubredditInfoCard from "../Subreddit/js/SubredditInfoCard";
import TextForm from "../PostForm/js/TextForm";
import PostMenu from "../PostMenu";
import LoginFormModal from "../auth/LoginFormModal";
import { getTimeElapsed, getPercentUpvoted } from "../../util/index.js";
import {
	postVote,
	getSubInfo,
	getPosts,
	editAPost,
} from "../../store/subreddits";
import { authenticate } from "../../store/session";
import "./css/index.css";

function SinglePostPage() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { subreddit, postId} = useParams();

	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");

	const subreddits = useSelector((state) => state.subreddits);
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		if (
			subreddits[subreddit] &&
			subreddits[subreddit].id &&
			subreddits[subreddit].posts &&
			!subreddits[subreddit].posts[postId]
		) {
			return history.push("/");
		}
	}, [subreddits]);

	useEffect(() => {
		if (currentUser) {
			dispatch(authenticate());
		}
	}, [postId, dispatch]);

	useEffect(() => {
		if (!subreddits[subreddit] || !subreddits[subreddit].id) {
			dispatch(getSubInfo(subreddit));
		}
		if (subreddits[subreddit] && !subreddits[subreddit].posts) {
			dispatch(getPosts(subreddit));
		}
	}, [dispatch, subreddits, subreddit]);

	useEffect(() => {
		let editPost = false;
		try {
			if (location.state.edit) {
				editPost = location.state.edit;
				history.replace();
				setEdit(editPost);
			}
		} catch (e) {}
	}, [dispatch, history, setEdit, location]);

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("text", text);
		dispatch(editAPost(postId, formData));
		setEdit(false);
	};

	return (
		<>
			{subreddits[subreddit] &&
				subreddits[subreddit].id &&
				subreddits[subreddit].posts &&
				subreddits[subreddit].posts[postId] && (
					<div className="single-post-page-main-container">
						<Link to={`/r/${subreddit}`}>
							<SubredditBanner
								sub={subreddits[subreddit]}
							></SubredditBanner>
						</Link>
						<div className="single-post-sub-info-container">
							<div className="single-post-container">
								<div className="single-post">
									<div className="single-post-votes-container">
										<LoginFormModal
											showModal={showModal}
											setShowModal={setShowModal}
											action={"Sign Up"}
										></LoginFormModal>
										<div
											className="vote upvote"
											onClick={async () => {
												if (!currentUser)
													return setShowModal(true);
												await dispatch(
													postVote(
														"true",
														postId,
														currentUser.id
													)
												);
												dispatch(authenticate());
											}}
										>
											<i
												className={`fa-solid fa-arrow-up ${
													currentUser &&
													currentUser.votes[postId] &&
													currentUser.votes[postId]
														.upvote === true &&
													"upvoted"
												}`}
											></i>
										</div>
										<div className="votes">
											{" "}
											{subreddits[subreddit].posts[postId]
												.votes.upvote_count -
												subreddits[subreddit].posts[
													postId
												].votes.downvote_count}
										</div>
										<div
											className="vote downvote"
											onClick={async () => {
												if (!currentUser)
													return setShowModal(true);
												await dispatch(
													postVote(
														"false",
														postId,
														currentUser.id
													)
												);
												dispatch(authenticate());
											}}
										>
											<i
												className={`fa-solid fa-arrow-down ${
													currentUser &&
													currentUser.votes[postId] &&
													currentUser.votes[postId]
														.upvote === false &&
													"downvoted"
												}`}
											></i>
										</div>
									</div>
									<div className="single-post-details">
										<div className="sub-post-info single">
											<div className="sub-post-text">
												<div className="profile-post-subreddit-time">
													<div className="profile-post-subreddit">
														<span className="profile-post-time">
															{`Posted by u/`}
															<Link
																to={`/user/${subreddits[subreddit].posts[postId].user.username}`}
															>
																<span className="profile-post-username">
																	{`${subreddits[subreddit].posts[postId].user.username} `}{" "}
																</span>
															</Link>

															{`
														${getTimeElapsed(subreddits[subreddit].posts[postId].created_at)}`}
															{subreddits[
																subreddit
															].posts[postId]
																.updated_at && (
																<span>
																	Edited:{" "}
																	{subreddits[
																		subreddit
																	].posts[
																		postId
																	].created_at
																		.split(
																			" "
																		)
																		.splice(
																			1,
																			4
																		)
																		.join(
																			" "
																		)}
																</span>
															)}
														</span>
													</div>
												</div>{" "}
												<div className="sub-post-title">
													{
														subreddits[subreddit]
															.posts[postId].title
													}
												</div>
											</div>

											{subreddits[subreddit].posts[postId]
												.image && (
												<a
													href={
														subreddits[subreddit]
															.posts[postId].image
													}
													target="_blank"
													rel="noreferrer"
													className="single-post-image-link"
												>
													<img
														src={
															subreddits[
																subreddit
															].posts[postId]
																.image
														}
														className="image-box-subreddit"
														alt="subreddit"
													></img>
												</a>
											)}

											{subreddits[subreddit].posts[postId]
												.text &&
												!edit && (
													<div>
														{subreddits[subreddit]
															.posts[postId]
															.text ? (
															<div className="sub-text-box single">
																{
																	subreddits[
																		subreddit
																	].posts[
																		postId
																	].text
																}
															</div>
														) : null}
													</div>
												)}

											{subreddits[subreddit].posts[postId]
												.type_of_post === "text" &&
												edit === true && (
													<>
														<form
															onSubmit={onSubmit}
														>
															<TextForm
																text={text}
																setText={
																	setText
																}
																post={
																	subreddits[
																		subreddit
																	].posts[
																		postId
																	]
																}
															></TextForm>
															<button className="submit-post-button">
																Submit
															</button>
														</form>
														<button
															onClick={() =>
																setEdit(false)
															}
															className="cancel-button"
														>
															Cancel
														</button>
													</>
												)}
											{subreddits[subreddit].posts[postId]
												.link && (
												<a
													href={
														subreddits[subreddit]
															.posts[postId].link
													}
													target="_blank"
													rel="noreferrer"
												>
													<div className="subreddit-url">
														{/* {subreddits[subreddit]
															.posts[postId].link
															.length > 50
															? `${subreddits[
																	subreddit
															  ].posts[
																	postId
															  ].link.slice(
																	0,
																	50
															  )}...`
															: subreddits[
																	subreddit
															  ].posts[postId]
																	.link} */}
														{
															subreddits[
																subreddit
															].posts[postId].link
														}
													</div>
												</a>
											)}
										</div>
										<div className="single-post-bottom-bar">
											<div className="single-post-bottom-bar-left">
												{/* <div className="single-post-comments-count">
													<i className="fa-regular fa-message"></i>
													<div>
														{
															subreddits[
																subreddit
															].posts[postId]
																.comment_count
														}
													</div>
												</div> */}

												{/* <div className="share">
												<i className="fa-solid fa-share"></i>
												<div>share</div>
											</div> */}
												{currentUser &&
													currentUser.username ===
														subreddits[subreddit]
															.posts[postId].user
															.username && (
														<PostMenu
															post={
																subreddits[
																	subreddit
																].posts[postId]
															}
														></PostMenu>
													)}
											</div>
											<div className="vote-percent">
												{getPercentUpvoted(
													subreddits[subreddit].posts[
														postId
													].votes
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<SubredditInfoCard
								sub={subreddits[subreddit]}
								title="About Community"
							></SubredditInfoCard>
						</div>
					</div>
				)}
		</>
	);
}

export default SinglePostPage;
