import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import "./index.css";

const SignUpForm = ({ action, setShowModal }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");

	useEffect(() => {
		setErrors([]);
	}, [email, password, username]);

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};
	const updateConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	const updateUsername = (username) => {
		let temp = username.replace(' ', '')
		setUsername(temp)
	}

	const onLogin = async (e) => {
		e.preventDefault();

		//Checks if passwords are matching
		if (password !== confirmPassword) {
			return setErrors(["Password and current password must match"]);
		}

		const data = await dispatch(signUp(username, email, password));
		if (data) {
			const dataErrors = []
			//Formats any errors
			data.forEach(e => {
				let msg = e.split(':')[1]
				dataErrors.push(msg)
			})
			setErrors(dataErrors);
		} else setShowModal(false);
	};

	// Remove erros if user starts typing
	useEffect(() => {
		setErrors([]);
	}, [email, username, password, confirmPassword]);

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
			</div>{" "}
			<div className="errors-container">
				{errors.map((error, ind) => (
					<div key={ind} className="error">
						{error}
					</div>
				))}
			</div>
			<form onSubmit={onLogin} className="login-form">
				<div className="input-container">
					<input
						name="email"
						type="email"
						className="signup-login-input"
						value={email}
						onChange={updateEmail}
							placeholder="(Maximum 255 characters)"
						required={true}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"Email must be under 255 characters and in proper email format, eg: email@email.com"
							)
						}
						onInput={(e) => e.target.setCustomValidity("")}
						maxLength={"255"}
					/>
					<label htmlFor="email" className={`input-label`}>
						Email 
					</label>
				</div>
				<div className="input-container">
					<input
						name="username"
						type="text"
						className="signup-login-input"
					
						value={username}
						onChange={(e) => updateUsername(e.target.value)}
						required={true}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"Username must be between 4 and 40 characters, using only alphanumeric characters"
							)
						}
						onInput={(e) => e.target.setCustomValidity("")}
						placeholder="(Between 4 and 40 characters)"
						minLength="4"
						maxLength="40"
						pattern="[A-Za-z0-9\s]+"
					/>
					<label htmlFor="email" className={`input-label `}>
						Username ( Alphanumeric values only )
					</label>
				</div>
				<div className="input-container">
					<input
						name="password"
						type="password"
						htmlFor="password"
						className={`signup-login-input`}
						placeholder="(Between 6 and 64 characters)"
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
				<div className="input-container">
					<input
						name="confirm-password"
						type="password"
						htmlFor="confirm-password"
						className={`signup-login-input`}
						value={confirmPassword}
						onChange={updateConfirmPassword}
						required={true}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"Password must be between 6 and 64 characters and match password"
							)
						}
						onInput={(e) => e.target.setCustomValidity("")}
						placeholder="(Must match password)"
						minLength="6"
						maxLength="64"
					></input>
					<label
						className={`input-label ${
							password.length > 0 ? "move-up-label" : ""
						}`}
					>
						Confirm Password
					</label>
				</div>
				<button
					className="signup-login-form-button"
					// disabled={password !== confirmPassword}
				>
					{action}
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
