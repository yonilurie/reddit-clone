import "./index.css";

function About() {
	return (
		<div className="about-container-main">
			<div className="about-container">
				<h1 className="about-about">About</h1>
				<h2 className="about-greetng">Hello, welcome to my site! </h2>
				<h3 className="about-description">
					'Teddir' is a clone of{" "}
					<a href="https://www.reddit.com/" className="external-link">
						{" "}
						Reddit.com{" "}
					</a>
					created by Yoni Lurie
				</h3>
				<div>
					<div className="list-title">Contact</div>
					<div>
						<a href="https://www.linkedin.com/in/yonatan-lurie-464266203/">
							<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)"></img>
						</a>
					</div>
					<div>
						<a href="https://github.com/yonilurie/yonilurie">
							<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)"></img>
						</a>
					</div>
				</div>
				<h3>This application was created using:</h3>
				<ul>
					<li>
						<div className="list-title">Languages</div>
						<div>
							<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"></img>
						</div>
					</li>
					<li>
						<div className="list-title">Front End</div>
						<div>
							<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"></img>
						</div>
					</li>

					<li>
						<div className="list-title">Back End</div>
						<div>
							<img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"></img>
						</div>
					</li>

					<li>
						<div className="list-title">Deployment</div>
						<div>
							<img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"></img>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default About;
