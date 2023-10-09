import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const CardInput = ({ cardId, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onSave(cardId, inputValue);
  };

  return (
    <div>
      <TextField
        label="Input field"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleSave}
        fullWidth
      />
    </div>
  );
};

export default CardInput;
