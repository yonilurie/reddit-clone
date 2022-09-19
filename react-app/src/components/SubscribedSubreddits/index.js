import "./index.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function SubscribedSubreddits() {
	const [currentSub, setCurrentSub] = useState("all");
	const [showMenu, setShowMenu] = useState(false);

	const { subreddit, username } = useParams();

	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if (subreddit) {
			setCurrentSub(`r/${subreddit}`);
			document.title = `Teddir - r/${subreddit}`;
		} else if (username) {
			setCurrentSub(`u/${username}`);
			document.title = `Teddir - u/${username}`;
		} else {
			setCurrentSub("r/all");
			document.title = `Teddir - Dive into anything`;
		}
	}, [subreddit, username]);

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu, setShowMenu]);

	return (
		<div
			className="subscribed-subs-container"
			onClick={() => setShowMenu(true)}
		>
			<div className="current-sub">{currentSub}</div>
			{showMenu && (
				<div className="subscribed-menu">
					<div>Your Communities</div>
					<br></br>
					{Object.values(user.member).length > 0 ? (
						Object.values(user.member).map((sub) => {
							return (
								<Link
									to={`/r/${sub.subreddit_info.name}`}
									key={sub.id}
									className="subscribed-sub-link"
								>
									r/{sub.subreddit_info.name}
								</Link>
							);
						})
					) : (
						<div className="no-subscribed-communities">
							Nothing here
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default SubscribedSubreddits;
