// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHANGE_VOTE = "session/CHANGE_VOTE";
const EDIT_RULES = "/session/EDIT_RULES";
const EDIT_COMMUNITY = "/session/EDIT_COMMUNITY";
const DELETE_SUB = "session/DELETE_SUB";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const changeVote = (postId) => ({
	type: CHANGE_VOTE,
	postId,
});

const editRules = (sub) => ({
	type: EDIT_RULES,
	sub,
});

const editCommunity = (sub) => ({
	type: EDIT_COMMUNITY,
	sub,
});

const deleteSub = (subredditName) => ({
	type: DELETE_SUB,
	subredditName,
});

const initialState = { user: null };


export const changeAVote = (userVote, postId, currentUserId) => async (dispatch) => {
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
		dispatch(changeVote(data.id));
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
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

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
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

export const editARule = (formData, subredditId) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditId}/rules`, {
		method: "PUT",
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editRules(data));
		return data;
	}
};

export const editCommunitySettings = (formData, subredditId) => async (
	dispatch
) => {
	const response = await fetch(`/api/r/${subredditId}/community`, {
		method: "PUT",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(editCommunity(data));
		return data;
	}
};

export const deleteARule = (formData, subredditId) => async (dispatch) => {
	const response = await fetch(`/api/r/${subredditId}/rules`, {
		method: "PUT",
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editRules(data));
		return data;
	}
};

export const deleteASubreddit = (subredditId, subredditName) => async (
	dispatch
) => {
	const response = await fetch(`/api/r/${subredditId}/delete-subreddit`, {
		method: "DELETE",
	});
	console.log("here");
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteSub(subredditName));
	}
};

export default function reducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case SET_USER:
			let votesArr = action.payload.votes;
			const votes = {};
			votesArr.forEach((vote) => {
				votes[vote.post_id] = vote;
			});
			const subredditsArr = action.payload.subreddits;
			const subreddits = {};
			subredditsArr.forEach((sub) => {
				subreddits[sub.name] = sub;
			});
			newState = { user: action.payload };

			newState.user.votes = votes;
			newState.user.subreddits = subreddits;

			return newState;
		case REMOVE_USER:
			return { user: null };

		case CHANGE_VOTE:
			newState = { ...state };
			newState.user.votes[action.postId].upvote = !newState.user.votes[
				action.postId
			].upvote;
			return newState;

		case EDIT_RULES:
			newState = { ...state };
			newState.user.subreddits[action.sub.name].rules = action.sub.rules;
			return newState;
		case EDIT_COMMUNITY:
			newState = { ...state };
			newState.user.subreddits[action.sub.name].description =
				action.sub.description;
			newState.user.subreddits[action.sub.name].display_name =
				action.sub.display_name;
			return newState;
		case DELETE_SUB:
			newState = { ...state };
			delete newState.user.subreddits[action.subredditName];
			return newState;
		default:
			return state;
	}
}
