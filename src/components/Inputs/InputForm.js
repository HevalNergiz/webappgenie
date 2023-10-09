import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      onSubmit(apiKey, prompt);
    } catch (error) {
      console.error(
        "Error generating text:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Key:
        <input
          className="form-control"
          type="text"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
        />
      </label>
      <br />
      <label>
        Prompt:
        <textarea
          className="form-control"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
      </label>
      <br />
      <button className="btn btn-outline-primary" type="submit">
        Submit your API key
      </button>
    </form>
  );
};

export default InputForm;
