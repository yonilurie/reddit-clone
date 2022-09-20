import { Link } from "react-router-dom";

function AboutSideCard() {
	return (
		<>
			<div className="subreddit-info-card-top">
				Site created By Yonatan Lurie
			</div>
			<div className="info-card-created">
				<a
					href="https://www.linkedin.com/in/yonatan-lurie-464266203"
					target="_blank"
					rel="noreferrer"
					className="footer-about-link"
				>
					Linkedin
				</a>
				<a
					href="https://github.com/yonilurie/reddit-clone"
					target="_blank"
					rel="noreferrer"
					className="footer-about-link"
				>
					Github Repo
				</a>

				<Link to="/about" className="footer-about-link">
					About the project
				</Link>
			</div>
		</>
	);
}

export default AboutSideCard;
