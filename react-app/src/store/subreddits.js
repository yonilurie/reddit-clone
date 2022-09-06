// constants
const GET_SUB = "subreddits/GET_SUB";
const GET_POSTS = "subreddits/GET_POSTS";
const POST_VOTE = "/subreddits/POST_VOTE";
const USER_VOTE = "/subreddits/USER_VOTE";
const ADD_USER = "/subreddits/GET_USER";
const DELETE_POST = "/subreddits/DELETE_POST";
const CREATE_POST = "/subreddits/CREATE_POST";
const EDIT_POST = "/subredddits/EDIT_POST";
const CREATE_SUB = "/subreddits/CREATE_SUB";

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
const userPageVote = (post) => ({
	type: USER_VOTE,
	post,
});

const addUser = (user) => ({
	type: ADD_USER,
	user,
});

const deletePost = (data) => ({
	type: DELETE_POST,
	data,
});

const createPost = (post) => ({
	type: CREATE_POST,
	post,
});

const editPost = (post) => ({
	type: EDIT_POST,
	post,
});

const createSub = (sub) => ({
	type: CREATE_SUB,
	sub,
});

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

export const getUserInfo = (username) => async (dispatch) => {
	const response = await fetch(`/api/u/${username}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(addUser(data));
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
		dispatch(vote(data));
	}
};
export const postUserVote = (userVote, postId, currentUserId) => async (
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
		dispatch(userPageVote(data));
	}
};

export const deleteAPost = (postId, username, subredditName) => async (
	dispatch
) => {
	const response = await fetch(`/api/r/${postId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		dispatch(
			deletePost({
				username,
				postId,
				subredditName,
			})
		);
	}
};

export const createAPostImage = (subredditId, formData) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditId}/post/image`, {
		method: "POST",
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(createPost(data));
		return data;
	}
};
export const createAPost = (subredditId, formData) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditId}/post`, {
		method: "POST",
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(createPost(data));
		return data;
	}
};

export const editAPost = (postId, formData) => async (dispatch) => {
	const response = await fetch(`/api/r/${postId}/post/edit`, {
		method: "PUT",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(editPost(data));
		return data;
	}
};

export const createASub = (formData) => async (dispatch) => {
	const response = await fetch(`/api/r/create`, {
		method: "POST",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(createSub(data));
		return data;
	}
};

const initialState = {};

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
		case ADD_USER:
			newState = { ...state };
			action.user["subreddit_name"] = action.user.username;
			if (action.user.posts.length > 0) {
				const posts = {};
				let karma = 0;
				action.user.posts.forEach((post) => {
					posts[post.id] = post;
					karma += post.votes.upvote_count;
					karma -= post.votes.downvote_count;
				});
				action.user.posts = posts;
				action.user.karma = karma;
			}
			newState[action.user.username] = action.user;
			return newState;
		case POST_VOTE:
			newState = { ...state };
			newState[action.post.subreddit_name].posts[action.post.id] =
				action.post;
			return newState;
		case USER_VOTE:
			newState = { ...state };
			newState[action.post.user.username].posts[action.post.id] =
				action.post;
			return newState;
		case DELETE_POST:
			newState = { ...state };
			if (newState[action.data.username]) {
				delete newState[action.data.username].posts[action.data.postId];
			}

			return newState;

		case CREATE_POST:
			newState = { ...state };
			newState[action.post.user.username].posts[action.post.id] =
				action.post;
			return newState;
		case EDIT_POST:
			newState = { ...state };
			console.log(newState);
			if (newState[action.post.user.username]) {
				newState[action.post.user.username].posts[action.post.id] =
					action.post;
			}
			newState[action.post.subreddit_name].posts[action.post.id] =
				action.post;
			return newState;

		case CREATE_SUB:
			newState = { ...state };
			newState[action.sub.name] = action.sub;
			return newState;
		default:
			return state;
	}
}
