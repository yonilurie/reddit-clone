import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./index.css";

const LoginForm = ({ action, setShowModal }) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(signUp(email, password));
		if (data) {
			setErrors(data);
		} else {
			setShowModal(false);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	useEffect(() => {
		setErrors([]);
	}, [email, password, username]);

	return (
		<div className="login-form-container">
			<div className="exit-container">
				{" "}
				<div onClick={() => setShowModal(false)} className="exit">
					X
				</div>
			</div>

			<div className="modal-title">
				<div className="modal-title-text">
					<h2>{action}</h2>
				</div>
			</div>
			<form onSubmit={onLogin} className="login-form">
				<div className="errors-container">
					{errors.map((error, ind) => (
						<div key={ind} className="error">
							{error}
						</div>
					))}
				</div>
				<div className="input-container">
					<input
						name="email"
						type="text"
						className="signup-login-input"
						value={email}
						onChange={updateEmail}
						required={true}
						maxLength={"255"}
					/>
					<label htmlFor="email" className={`input-label `}>
						Email
					</label>
				</div>
				<div className="input-container">
					<input
						name="username"
						type="text"
						className="signup-login-input"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required={true}
						maxLength="64"
						minLength="1"
					/>
					<label htmlFor="email" className={`input-label `}>
						Username
					</label>
				</div>
				<div className="input-container">
					<input
						name="password"
						type="password"
						htmlFor="password"
						className={`signup-login-input`}
						value={password}
						onChange={updatePassword}
						required={true}
						minLength="6"
					></input>
					<label
						className={`input-label ${
							password.length > 0 ? "move-up-label" : ""
						}`}
					>
						Password
					</label>
				</div>
				<button className="signup-login-form-button">Log In</button>
			</form>
		</div>
	);
};

export default LoginForm;
