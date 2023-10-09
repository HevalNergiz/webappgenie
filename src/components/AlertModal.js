import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IconAlertCircle } from "@tabler/icons-react";

const CustomModal = ({ title, content, showModal, closeModal }) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      className="promt-modal text-center"
      show={showModal}
      onHide={closeModal}
      centered
    >
      <Modal.Body>
        <div className="mb-4">
          <IconAlertCircle color="#907AD6" size={48} />
        </div>
        <h2 className="mb-4 fw-bold">{title}</h2>
        <div className="fw-light">{content}</div>
        <div className="d-flex mt-4">
          <Button
            className="w-100"
            variant="outline-primary"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
