import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { getSubInfo, getPosts, editAPost } from "../../store/subreddits";
import { authenticate } from "../../store/session";

import "./css/index.css";
import SinglePostContent from "./SinglePostContent";
import SubredditBanner from "../Subreddit/js/SubredditBanner";
import SubredditInfoCard from "../Subreddit/js/SubredditInfoCard";
import SinglePostComment from "./SinglePostComment";
import SinglePostCommentContainer from "./SinglePostCommentContainer";

function SinglePostPage() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { subreddit, postId } = useParams();

	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");

	const subreddits = useSelector((state) => state.subreddits);
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
			dispatch(getSubInfo(subreddit)).then((data) => {
				if (data.error) {
					return history.push("/");
				}
			});
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
								></SinglePostCommentContainer>
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
