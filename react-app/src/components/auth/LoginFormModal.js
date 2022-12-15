import React from 'react'
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

//Modal for both login and sign up forms
function LoginFormModal({ showModal, setShowModal, action }) {
	return (
		<>
			{showModal && action === "Log In" && (
				<Modal onClose={() => setShowModal(false)}>
					<LoginForm
						action={action}
						setShowModal={setShowModal}
					></LoginForm>
				</Modal>
			)}
			{showModal && action === "Sign Up" && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm
						action={action}
						setShowModal={setShowModal}
					></SignUpForm>
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;