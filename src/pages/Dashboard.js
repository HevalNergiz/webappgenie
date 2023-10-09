import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/app";
import app from "../firebase";
import "firebase/firestore";

export default function Dashboard() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const db = app.firestore();

  const createNewProject = async () => {
    const newProjectsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("projects")
      .doc(); // creates a project with a random id
  
    const randomDocId = newProjectsRef.id; // gets the random id
  
    const projectData = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log("Random document ID:", randomDocId);
  
    newProjectsRef.set(projectData)
    .then(() => {
      console.log("Document successfully written!");
      history.push(`/new-project/${randomDocId}`);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  };
  
  
  return (
    <>
      <Row className="justify-content-center new-vh-100 align-items-center">
        <Col md={6}>
          <Card className="p-5">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-2 text-pprimary">
              <Card.Title>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  class="bi bi-folder-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                </svg>
              </Card.Title>

              <Card.Text className="text-center mb-4">
                Get started with creating a new project
              </Card.Text>
              <Button
                onClick={createNewProject}
                variant="primary"
                className="d-flex align-itmes-center justify-content-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                New Project
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
