import React, { useState } from "react";
import { Form } from "react-bootstrap";

function CustomCheckbox(props) {
  const { id, label, onChange, name, whatisthis, children } = props;
  const [checked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const input = event.target.closest("input");

    if (input) {
      onChange(input.id, input.checked, event);
      setIsChecked(input.checked);
    }
  };

  return (
    <Form.Check
      custom
      type="checkbox"
      id={id}
      name={name}
      whatisthis={whatisthis}
      label={
        <span className={`checkbox-label`} onClick={handleCheckboxChange}>
          <span className="checkmark" />
          {label}
          {children}
        </span>
      }
      onChange={handleCheckboxChange}
    />
  );
}

export default CustomCheckbox;
