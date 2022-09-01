import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
function LoginFormModal({ showModal, setShowModal, action }) {
	return (
		<>
			{showModal && action === "Log In" && (
				<Modal>
					<LoginForm
						action={action}
						setShowModal={setShowModal}
					></LoginForm>
				</Modal>
			)}
			{showModal && action === "Sign Up" && (
				<Modal>
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
