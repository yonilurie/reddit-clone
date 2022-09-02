import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./index.css";

const LoginForm = ({ action , setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
    } else {
      setShowModal(false)
    }
  
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="login-form-container">
			<div onClick={() => setShowModal(false)}>XXXX</div>
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
