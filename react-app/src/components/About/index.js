import "./index.css";

function About() {
	return (
		<div className="about-container-main">
			<div className="about-container">
				<h1 className="about-about">About</h1>
				<h2 className="about-greetng">Hello, welcome to my site! </h2>
				<h3 className="about-description">
					'Teddir' is a clone of{" "}
					<a
						href="https://www.reddit.com/"
						className="external-link"
						target="_blank"
						rel="noreferrer"
					>
						{" "}
						Reddit.com{" "}
					</a>
					created by Yoni Lurie
				</h3>
				<div className="about-link-container">
					<div className="list-title">Contact</div>
					<div className="about-link-div">
						<div>LinkedIn</div>
						<a
							href="https://www.linkedin.com/in/yonatan-lurie-464266203/"
							target="_blank"
							rel="noreferrer"
							className="about-link-link"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z" />
							</svg>
						</a>
					</div>
					<div className="about-link-div">
						<div>Github</div>
						<a
							href="https://github.com/yonilurie/yonilurie"
							target="_blank"
							rel="noreferrer"
							className="about-link-link"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z" />
							</svg>
						</a>
					</div>
				</div>
				<h3>This application was created using:</h3>
				<ul>
					<li>
						<div className="list-title">Languages</div>
						<div>
							<img
								alt="javascript"
								src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
							></img>
						</div>
						<div>
							<img
								alt="python"
								src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
							></img>
						</div>
					</li>
					<li>
						<div className="list-title">Front End</div>
						<div>
							<img
								alt="react"
								src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
							></img>
						</div>
						<div>
							<img
								alt="redux"
								src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
							></img>
						</div>
						<div>
							<img
								alt="react-router"
								src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
							></img>
						</div>
					</li>

					<li>
						<div className="list-title">Back End</div>
						<div>
							<img
								alt="flask"
								src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"
							></img>
						</div>
						<div>
							<img
								alt="postrges"
								src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"
							></img>
						</div>
					</li>

					<li>
						<div className="list-title">Deployment</div>
						<div>
							<img
								alt="heroku"
								src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white"
							></img>
						</div>
						<div>
							<img
								alt="docker"
								src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"
							></img>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default About;
