import React from 'react'
// Plaveholder if a user has no posts
function PlaceholderPosts({ user }) {
	return (
		<div className="placeholder-posts-container-main">
			<div className="empty-post-main">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((empty) => {
					return (
						<div className="empty-post-container" key={empty}>
							<div className="empty-votes">
								<i className={`fa-solid fa-arrow-up `}></i>
								<i className={`fa-solid fa-arrow-down `}></i>
							</div>
						</div>
					);
				})}
				<div className="empty-post-text-container-flex">
					<div className="empty-post-text">
						<div className="empty-post-big-text" id='empty-post-big-text'>
							hmm... no posts here yet
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlaceholderPosts;
