import { Modal } from "react-bootstrap";

export const CustomModal = ({ showModal, onHideModal, children }) => {
  return (
    <Modal show={showModal} onHide={onHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Notificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
