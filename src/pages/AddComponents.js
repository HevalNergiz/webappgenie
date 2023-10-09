import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap"; // Import Alert component
import { useHistory } from "react-router-dom";
import ComponentLayout from "../components/ComponentLayout";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import app from "../firebase";
import "firebase/firestore";
import { useParams } from "react-router-dom";

function AddComponents() {
  const [apiKey, setApiKey] = useState();
  const [res, setRes] = useState();
  const history = useHistory();
  const { currentUser } = useAuth();
  const db = app.firestore();
  const [colors, setColors] = useState("");
  const [design, setDesign] = useState("");
  const { projectId } = useParams();
  const [checkedComponents, setCheckedComponents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showErrorAlert, setShowErrorAlert] = useState(false); 

  useEffect(() => {
    setColors(window.localStorage.getItem("selectedColor"));
    setDesign(window.localStorage.getItem("style"));

    console.log(apiKey);
  }, [apiKey, res, colors, design]);


  const goToAppReady = async () => {
    if (apiKey === undefined || (apiKey && apiKey.trim() === "")) { 
      setErrorMessage("API key cannot be empty.");
      setShowErrorAlert(true);
      return; // Exit the function early
    }else{
      const projects = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects");

      const projectData = {
        color_scheme: colors,
        style: design,
        appStruct: checkedComponents,
      };
      sendPrompt(apiKey, JSON.stringify(projectData));
      await projects
        .doc(projectId)
        .update(projectData)
        .then(() => {
          history.push(`/results/${projectId}`);
        });

    }

  };

  const sendPrompt = async (apiKey, prompt) => {
    try {
      const response = await axios.post("http://localhost:3001/generate-text", {
        apiKey: apiKey,
        prompt: prompt,
      });
      setRes(response.data);
      setShowErrorAlert(false); // Hide error message if the request is successful
    } catch (error) {
      console.error("Error generating text:", error);
      setErrorMessage(
        "Invalid API key or an error occurred. Please try again."
      ); // Set error message
      setShowErrorAlert(true); // Show error message
    }
  };

  return (
    <div>
      <h3>Add Components</h3>
      <p>
        Select the components you want to have in each page of your web
        application.
      </p>
      {showErrorAlert && ( // Conditionally render Alert component
        <Alert
          variant="danger"
          onClose={() => setShowErrorAlert(false)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
      <ComponentLayout
        onCheckedComponentsChange={(checkedComponents) =>
          setCheckedComponents(checkedComponents)
        }
      />
      <label>
        API Key:
        <input
          className="form-control"
          type="text"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          required
        />
      </label>
      <p>{res}</p>
      <Button onClick={goToAppReady} variant="primary">
        Generate Web App
      </Button>
    </div>
  );
}

export default AddComponents;
