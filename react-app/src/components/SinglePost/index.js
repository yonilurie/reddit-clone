import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

import { getSubInfo, getPosts, editAPost } from "../../store/subreddits";

import SinglePostContent from "./SinglePostContent";
import SubredditBanner from "../Subreddit/js/SubredditBanner";
import SubredditInfoCard from "../Subreddit/js/SubredditInfoCard";
import SinglePostCommentContainer from "./SinglePostCommentContainer";
import AboutSideCard from "../About/AboutSideCard";

import "./css/index.css";

function SinglePostPage() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { subreddit, postId } = useParams();

	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editComment, setEditComment] = useState(false);
	const [text, setText] = useState("");

	const subreddits = useSelector((state) => state.subreddits);

	//Scroll to top on render
	useEffect(() => window.scrollTo(0, 0), []);

	// Ig post does not exist return to home
	useEffect(() => {
		if (
			subreddits[subreddit] &&
			subreddits[subreddit].id &&
			subreddits[subreddit].posts &&
			!subreddits[subreddit].posts[postId]
		) {
			return history.push("/");
		}
	}, [subreddits, postId, subreddit, history]);

	// useEffect(() => {
	// 	if (currentUser) dispatch(authenticate());
	// }, [postId, dispatch]);

	// If subreddit does not exist, return
	useEffect(() => {
		if (!subreddits[subreddit] || !subreddits[subreddit].id) {
			dispatch(getSubInfo(subreddit)).then((data) => {
				if (data.error) return history.push("/");
			});
		}
		if (subreddits[subreddit] && !subreddits[subreddit].posts) {
			dispatch(getPosts(subreddit));
		}
	}, [dispatch, subreddits, subreddit, history]);

	//If user is redirected from clicking edit, set edit
	useEffect(() => {
		try {
			if (location.state.edit) {
				setEdit(location.state.edit);
				history.replace();
			}
		} catch (e) {}
	}, [dispatch, history, setEdit, location]);

	//Handle submit form
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("text", text);
		dispatch(editAPost(postId, formData));
		setEdit(false);
	};

	return (
		<>
			{subreddits &&
				subreddits[subreddit] &&
				subreddits[subreddit].id &&
				subreddits[subreddit].posts &&
				subreddits[subreddit].posts[postId] && (
					<div className="single-post-page-main-container">
						<SubredditBanner
							sub={subreddits[subreddit]}
						></SubredditBanner>

						<div className="single-post-sub-info-container">
							<div className="single-post-container">
								<SinglePostContent
									post={subreddits[subreddit].posts[postId]}
									showModal={showModal}
									setShowModal={setShowModal}
									edit={edit}
									setEdit={setEdit}
									onSubmit={onSubmit}
									text={text}
									setText={setText}
								></SinglePostContent>
								<div className="single-post-gray-bar"></div>
								<SinglePostCommentContainer
									post={subreddits[subreddit].posts[postId]}
									editComment={editComment}
									setEditComment={setEditComment}
								></SinglePostCommentContainer>
							</div>
							<div className="subreddit-info">
								<SubredditInfoCard
									sub={subreddits[subreddit]}
									title="About Community"
								></SubredditInfoCard>
								<div>
									<AboutSideCard
										sub={subreddits[subreddit]}
									></AboutSideCard>
								</div>
							</div>
						</div>
					</div>
				)}
		</>
	);
}

export default SinglePostPage;
