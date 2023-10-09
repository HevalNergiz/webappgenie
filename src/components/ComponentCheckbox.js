import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import CustomCheckbox from "./CustomCheckbox";

function ComponentCheckbox(props) {
  const { id, label, onTextAreaChange, className, onCheckedChange } = props;
  const [textAreaValue, setTextAreaValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState(null);

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
    onTextAreaChange(id, event.target.value);
  };

  const handleCheckBox = (event) => {
    let checkmother = event.target.closest(".custom-checkbox");
    let check = checkmother.querySelector("input");
    let label = checkmother.querySelector(".checkbox-label");
    let isItemChecked = check.checked;

    if (isItemChecked === false) {
      check.checked = !isItemChecked;
      label.classList.add("checked");
    }
  };

  const handleSaveChanges = () => {
    const button = document.getElementById(activeButtonId);
    if (textAreaValue.trim()) {
      button.classList.add("prompted");
    } else {
      button.classList.remove("prompted");
    }
    setModalShow(false);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setActiveButtonId(event.currentTarget.id);
    setModalShow(true);

    let checkmother = event.target.closest(".custom-checkbox");
    let check = checkmother.querySelector("input");
    let isChecked = check.checked;

    if (!isChecked) {
      handleCheckBox(event);
      onCheckedChange(id, !isChecked);
    }
  };

  return (
    <div className={`component-checkbox ${className}`}>
      <CustomCheckbox
        id={id}
        onChange={(inputId, isChecked) =>
          props.onCheckedChange(inputId, isChecked)
        }
      >
        <div className="cover-of-component"></div>
        <div className="d-flex align-items-center justify-content-between px-2 mt-2 mb-3">
          <label className="mb-0">{label}</label>
          <button
            id={`${id}promptarea`}
            className="magic-component-button unstyled-btn"
            onClick={handleButtonClick}
          >
            <div className="magic-pen" alt="Custom Icon" />
          </button>
        </div>
      </CustomCheckbox>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
        className="promt-modal"
        size="lg"
      >
        <Modal.Body className="p-0">
          <Form.Group className="mb-0" controlId={`${id}textarea`}>
            <Form.Control
              as="textarea"
              placeholder="write the customization you want"
              value={textAreaValue}
              onChange={handleTextAreaChange}
              rows={5}
            />
            <div className="mymodal-footer">
              <Button variant="outline-primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ComponentCheckbox;
