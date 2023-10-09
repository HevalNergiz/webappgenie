import React from "react";
import { Form } from "react-bootstrap";

function CustomRadio(props) {
  const { id, label, checked, onChange, name } = props;

  const handleRadioChange = (event) => {
    const input = event.target.closest("input");
    onChange(input.id);
  };

  return (
    <Form.Check
      custom
      type="radio"
      id={id}
      name={name}
      label={
        <span className={`radio-label ${checked ? "checked" : ""}`}>
          <span className="checkmark" />
          {label}
        </span>
      }
      checked={checked}
      onChange={handleRadioChange}
    />
  );
}

export default CustomRadio;
