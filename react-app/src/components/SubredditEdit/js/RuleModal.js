import { Modal } from "../../../context/Modal";

function RuleModal({ showRuleModal, setShowRuleModal }) {
	return <div>{showRuleModal && <Modal></Modal>}</div>;
}

export default RuleModal;
