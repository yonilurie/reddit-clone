import "./index.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function SubscribedSubreddits() {
	const [currentSub, setCurrentSub] = useState("all");
	const [showMenu, setShowMenu] = useState(false);

	const { subreddit } = useParams();

	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if (subreddit) {
			setCurrentSub(`r/${subreddit}`);
			document.title = `Teddit - r/${subreddit}`;
		} else setCurrentSub("r/all");
	}, [subreddit]);

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
			<div>{currentSub}</div>
			{showMenu && (
				<div className="subscribed-menu">
					{Object.values(user.member).length > 0 &&
						Object.values(user.member).map((sub) => {
							return (
								<Link
									to={`/r/${sub.subreddit_info.name}`}
									key={sub.id}
									className="subscribed-sub-link"
								>
									{sub.subreddit_info.name}
								</Link>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default SubscribedSubreddits;
