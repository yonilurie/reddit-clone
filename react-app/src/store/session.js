// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHANGE_VOTE = "session/CHANGE_VOTE";

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

const initialState = { user: null };

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

export const changeUserVote = (postId) => async (dispatch) => {
	dispatch(changeVote(postId));
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
			newState = { user: action.payload };

			newState.user.votes = votes;

			return newState;
		case REMOVE_USER:
			return { user: null };

		case CHANGE_VOTE:
			newState = { ...state };
			newState.user.votes[action.postId].upvote = !newState.user.votes[
				action.postId
			].upvote;
			return newState;
		default:
			return state;
	}
}
