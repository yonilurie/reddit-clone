// constants
const GET_SUB = "subreddits/GET_SUB";
const GET_POSTS = "subreddits/GET_POSTS";
const HOME_POSTS = "subreddits/HOME_POSTS";
const POST_VOTE = "/subreddits/POST_VOTE";
const USER_VOTE = "/subreddits/USER_VOTE";
const ADD_USER = "/subreddits/GET_USER";
const DELETE_POST = "/subreddits/DELETE_POST";
const CREATE_POST = "/subreddits/CREATE_POST";
const EDIT_POST = "/subredddits/EDIT_POST";
const CREATE_SUB = "/subreddits/CREATE_SUB";
const EDIT_RULE = "subreddits/EDIT_RULE";
const EDIT_SETTING = "subreddits/EDIT_SETTING";
const REMOVE_SUB = "subreddits/REMOVE_SUB";
const ADD_COMMENT = "subreddits/ADD_COMMENT";
const TOGGLE_MEMBER = "subreddits/TOGGLE_MEMBER";
const GET_MEMBERS = "subreddits/GET_MEMBERS";

const getMembers = (sub) => ({
	type: GET_MEMBERS,
	sub,
});

const addSub = (sub) => ({
	type: GET_SUB,
	sub,
});

const addPosts = (posts, subredditName) => ({
	type: GET_POSTS,
	posts,
	subredditName,
});
const homePosts = (posts, subredditName) => ({
	type: HOME_POSTS,
	posts,
	subredditName,
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

const editRule = (sub) => ({
	type: EDIT_RULE,
	sub,
});

const editSubSettings = (sub) => ({
	type: EDIT_SETTING,
	sub,
});

const removeSub = (subName) => ({
	type: REMOVE_SUB,
	subName,
});

const addComment = (post, subredditName) => ({
	type: ADD_COMMENT,
	post,
	subredditName,
});
const editComment = (post, subredditName) => ({
	type: ADD_COMMENT,
	post,
	subredditName,
});

const toggleMember = (sub) => ({
	type: TOGGLE_MEMBER,
	sub,
});

export const getSubMembers = (subredditName) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditName}`, {
		method: "GET",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getMembers(data));
		return data;
	}
};

export const getSubInfo = (subredditName) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditName}`, {
		method: "GET",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addSub(data));
		return data;
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
		return data;
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
		dispatch(addPosts(data, subredditName));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getHomePosts = () => async (dispatch) => {
	const response = await fetch(`/api/r/home`, {
		method: "GET",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(homePosts(data, "all"));
		return data;
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

		// Make an upvote when you post a post
		const formData = new FormData();
		formData.append("upvote", true);
		formData.append("post_id", data.id);
		await fetch("/api/vote", {
			method: "POST",
			body: formData,
		});

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

		// Make an upvote when you post a post
		const formData = new FormData();
		formData.append("upvote", true);
		formData.append("post_id", data.id);
		await fetch("/api/vote", {
			method: "POST",
			body: formData,
		});

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

export const editSubRules = (sub) => async (dispatch) => {
	dispatch(editRule(sub));
};

export const editSubCommunitySettings = (sub) => async (dispatch) => {
	dispatch(editSubSettings(sub));
};

export const removeASub = (subName) => async (dispatch) => {
	dispatch(removeSub(subName));
};

export const addAComment = (comment, postId, subredditName) => async (
	dispatch
) => {
	const formData = new FormData();
	formData.append("comment", comment);
	const response = await fetch(`/api/comments/${postId}`, {
		method: "POST",
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		const formData = new FormData();
		console.log(data)
		formData.append("upvote", true);
		formData.append("comment_id", data.id);
		await fetch("/api/vote/comment", {
			method: "POST",
			body: formData,
		});
		dispatch(addComment(data, subredditName));
		return data;
	}
};
export const replyToAComment = (
	comment,
	postId,
	subredditName,
	originalCommentId
) => async (dispatch) => {
	const formData = new FormData();
	formData.append("comment", comment);
	const response = await fetch(
		`/api/comments/${postId}/reply/${originalCommentId}`,
		{
			method: "POST",
			body: formData,
		}
	);
	// const temp = await response.json()
	// console.log(temp)
	if (response.ok) {
		const data = await response.json();
		console.log(data);
		dispatch(addComment(data, subredditName));
		return data;
	}
};
export const editAComment = (comment, commentId, subredditName) => async (
	dispatch
) => {
	const formData = new FormData();
	formData.append("comment", comment);
	const response = await fetch(`/api/comments/${commentId}/edit`, {
		method: "PUT",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();

		dispatch(editComment(data, subredditName));
		return data;
	}
};

export const deleteAComment = (commentId) => async (dispatch) => {
	const response = await fetch(`/api/comments/${commentId}/delete`, {
		method: "DELETE",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(editComment(data, data.subreddit_name));
		return data;
	}
};

export const makeCommentVote = (
	userVote,
	commentId,
	currentUserId,
	postId
) => async (dispatch) => {
	const formData = new FormData();
	formData.append("comment_id", commentId);
	formData.append("user_id", currentUserId);
	formData.append("upvote", userVote);
	formData.append("post_id", postId);

	const response = await fetch("/api/vote/comment", {
		method: "POST",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(editComment(data, data.subreddit_name));
		return data;
	}
};

export const toggleMembership = (subredditId) => async (dispatch) => {
	const formData = new FormData();
	formData.append("subreddit_id", subredditId);
	const response = await fetch("/api/r/join", {
		method: "POST",
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(toggleMember(data));
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
			const posts = {};
			if (action.posts.length > 0) {
				action.posts.forEach((post) => {
					posts[post.id] = post;
				});
			}
			// newState[action.subredditName] = {};
			newState[action.subredditName].posts = posts;
			return newState;
		case HOME_POSTS:
			newState = { ...state };
			const homePosts = {};
			if (action.posts.length > 0) {
				action.posts.forEach((post) => {
					homePosts[post.id] = post;
					if (!newState[post.subreddit_name]) {
						newState[post.subreddit_name] = {};
						newState[post.subreddit_name].posts = {};
					}
					newState[post.subreddit_name].posts[post.id] = post;
				});
			}
			newState[action.subredditName] = {};
			newState[action.subredditName].posts = homePosts;
			return newState;
		case ADD_USER:
			if (!action.user.error) {
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
			} else {
				return state;
			}
		case POST_VOTE:
			newState = { ...state };
			if (newState[action.post.subreddit_name]) {
				newState[action.post.subreddit_name].posts[action.post.id] =
					action.post;
			}
			if (
				newState[action.post.user.username] &&
				newState[action.post.user.username].posts &&
				newState[action.post.user.username].posts[action.post.id]
			) {
				newState[action.post.user.username].posts[action.post.id] =
					action.post;
			}
			if (newState["all"] && newState["all"].posts[action.post.id]) {
				newState["all"].posts[action.post.id] = action.post;
			}
			return newState;
		case USER_VOTE:
			newState = { ...state };
			if (
				newState[action.post.user.username] &&
				newState[action.post.user.username].posts &&
				newState[action.post.user.username].posts[action.post.id]
			) {
				newState[action.post.user.username].posts[action.post.id] =
					action.post;
			}

			if (
				newState[action.post.subreddit_name] &&
				newState[action.post.subreddit_name].posts[action.post.id]
			) {
				newState[action.post.subreddit_name].posts[action.post.id] =
					action.post;
			}
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
			// newState[action.post.subreddit_name].posts[action.post.id] = action.post
			return newState;
		case EDIT_POST:
			newState = { ...state };

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
			newState[action.sub.name].posts = {};
			return newState;

		case EDIT_RULE:
			newState = { ...state };
			if (newState[action.sub.name]) {
				newState[action.sub.name].rules = action.sub.rules;
				return newState;
			}

			return state;
		case EDIT_SETTING:
			newState = { ...state };
			if (newState[action.sub.name]) {
				newState[action.sub.name].display_name =
					action.sub.display_name;
				newState[action.sub.name].description = action.sub.description;
				newState[action.sub.name].color = action.sub.color;
			}
			return state;
		case REMOVE_SUB:
			newState = { ...state };
			if (newState[action.subName]) {
				delete newState[action.subName];
			}
			return newState;

		case ADD_COMMENT:
			newState = { ...state };
			if (
				newState[action.subredditName] &&
				newState[action.subredditName].posts[action.post.id]
			) {
				newState[action.subredditName].posts[action.post.id] =
					action.post;
			}
			return newState;
		case GET_MEMBERS:
			newState = { ...state };
			if (newState[action.sub.name]) {
				newState[action.sub.name].members = action.sub.members;
			}
			return newState;
		default:
			return state;
	}
}
