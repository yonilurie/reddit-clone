import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./index.css";

//Login form, renders inside of modal
const LoginForm = ({ action, setShowModal }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//Remove errors once user changes their input
	useEffect(() => {
		setErrors([]);
	}, [email, password]);

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));

		if (data) setErrors(data);
		else setShowModal(false);
	};

	return (
		<div className="login-form-container">
			<div className="exit-container">
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
						type="email"
						className="signup-login-input"
						value={email}
						onChange={updateEmail}
						required={true}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"Email must be under 255 characters and in proper email format, eg: email@email.com"
							)
						}
						onInput={(e) => e.target.setCustomValidity("")}
						maxLength={"255"}
					/>
					<label
						htmlFor="email"
						className={`input-label ${
							email.length > 0 ? "move-up-label" : ""
						}`}
					>
						Email
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
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"Password must be between 6 and 64 characters"
							)
						}
						onInput={(e) => e.target.setCustomValidity("")}
						minLength="6"
						maxLength="64"
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