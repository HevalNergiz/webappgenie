import React, { useState } from "react";
import AceEditor from "react-ace";
import { Button, Modal } from "react-bootstrap";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = () => {
  const [code, setCode] = useState("//Kodunuz");

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const [userRequest, setUserRequest] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUserRequestChange = (e) => {
    setUserRequest(e.target.value);
  };

  const handleRequestChanges = async () => {
    const prompt = `${userRequest}. Current code:\n${code}`;

    const apiUrl =
      "https://api.openai.com/v1/engines/davinci-codex/completions";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "[API]",
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 100,
          n: 1,
          temperature: 0.5,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const modifiedCode = data.choices[0].text.trim();
        setCode(modifiedCode);
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }

    // Close the modal and clear the user request
    handleCloseModal();
    setUserRequest("");
  };

  return (
    <div>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={handleCodeChange}
        value={code}
        name="ace-editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
        showPrintMargin={false}
        width="100%"
        height="500px"
      />

      <Button onClick={handleShowModal}>Request changes from AI</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={userRequest}
            onChange={handleUserRequestChange}
            style={{ width: "100%", height: "100px" }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRequestChanges}>
            Request Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CodeEditor;
