
export const getTimeElapsed = (createdAt) => {
	let newDate = new Date(createdAt);
	let today = new Date();
	let diff = today.getTime() - newDate.getTime();
	let days = diff / (1000 * 3600 * 24);

	if (days * 24 < 1) {
		return `${Math.floor(days * 24 * 60)} minutes ago`;
	} else if (days < 1) {
		return `${Math.floor(days * 24)} hours ago`;
	} else {
		return `${Math.floor(days)} days ago`;
	}
};

export const getPercentUpvoted = (votes) => {
	const { upvote_count, downvote_count, total } = votes;
	if (downvote_count === 0 && upvote_count > 0) {
		return "100% Upvoted";
	}
	if (downvote_count === 0 && upvote_count === 0) {
		return "No votes yet";
	}
	if (downvote_count === upvote_count) {
		return "50% upvoted";
	}
	if (downvote_count > upvote_count) {
		return 100 - (upvote_count / downvote_count) * 100;
	}
	if (upvote_count > downvote_count) {
		return (upvote_count / downvote_count) * 100;
	}
};

export const postVote = async (vote, postId, currentUserId) => {
	
	const formData = new FormData();
	formData.append("post_id", postId);
	formData.append("user_id", currentUserId);
	formData.append("upvote", vote);

	const data = await fetch("/api/vote", {
		method: "POST",
		body: formData,
	});
	const res = await data.json();
	console.log(res);
};