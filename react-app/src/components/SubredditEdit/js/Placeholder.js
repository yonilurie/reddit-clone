import React from 'react'
//Plaveholder for editing a subreddit
function SubredditEditPlaceholder() {
	return (
		<div className="edit-subreddit-main-content">
			<h2 className="edit-subreddit-header"> Welcome to Mod Tools!</h2>
			<div className="edit-subreddit-placeholder">
				<div className="edit-subreddit-placeholder-content">
					<img
						className="kitteh"
						src="https://www.redditstatic.com/desktop2x/img/snoomoji/cat_blep.png"
						alt='Kitteh!'
					></img>
					<div className="kitteh-message">
						Edit your subreddit here using the tabs on the left!
					</div>
					<div className="kitteh-sub-message">Kitteh is pleased</div>
				</div>
			</div>
		</div>
	);
}

export default SubredditEditPlaceholder;
