// constants
const GET_SUB = "subreddits/GET_SUB";
const GET_POSTS = "subreddits/GET_POSTS";
const POST_VOTE = "/subreddits/POST_VOTE";

const addSub = (sub) => ({
	type: GET_SUB,
	sub,
});

const addPosts = (posts) => ({
	type: GET_POSTS,
	posts,
});

const vote = (post) => ({
	type: POST_VOTE,
	post,
});

const initialState = {};

export const getSubInfo = (subredditName) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditName}`, {
		method: "GET",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addSub(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getPosts = (subredditName) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditName}/posts`, {
		method: "GET",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addPosts(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const postVote = (userVote, postId, currentUserId) => async (
	dispatch
) => {
	const formData = new FormData();
	formData.append("post_id", postId);
	formData.append("user_id", currentUserId);
	formData.append("upvote", userVote);

	const response = await fetch("/api/vote", {
		method: "POST",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		console.log(data);
		dispatch(vote(data));
	}
};

export default function subreddits(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_SUB:
			newState = { ...state };
			newState[action.sub.name] = action.sub;
			return newState;
		case GET_POSTS:
			newState = { ...state };
			if (action.posts.length > 0) {
				let subName = action.posts[0].subreddit_name;

				const posts = {};
				action.posts.forEach((post) => {
					posts[post.id] = post;
				});
				newState[subName].posts = posts;
			}
			return newState;
		case POST_VOTE:
			newState = { ...state };
			newState[action.post.subreddit_name].posts[action.post.id] =
				action.post;
			return newState;
		default:
			return state;
	}
}
