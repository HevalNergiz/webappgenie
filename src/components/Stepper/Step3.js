import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import deleteimg from "../../styles/images/delete.svg";

const Step3 = () => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [nameUsed, setNameUsed] = useState(false);
  const [maxItemsReached, setMaxItemsReached] = useState(false);
  const [showVibrate, setShowVibrate] = useState(false);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (inputText && !items.some((item) => item.name === inputText)) {
      setNameUsed(false);
      if (items.length < 5) {
        setItems([...items, { name: inputText, id: String(items.length + 1) }]);
        setInputText("");
      } else {
        setMaxItemsReached(true);
      }
    } else {
      setNameUsed(true);
    }
  };

  const handleChange = (event) => {
    setInputText(event);
    setNameUsed(items.some((item) => item.name === event));
    setMaxItemsReached(items.length >= 5);
  };
  const handleDelete = (itemToDelete) => {
    setItems(items.filter((item) => item.name !== itemToDelete));
    if (items.length === 5) {
      setMaxItemsReached(false);
    }
  };

  const handleAddPage = () => {
    if (nameUsed || maxItemsReached) {
      setShowVibrate(true);
      setTimeout(() => {
        setShowVibrate(false);
      }, 500);
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    window.localStorage.setItem("pages", JSON.stringify(items));
  }, [items]);
  return (
    <div>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="position-relative ">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                value={inputText}
                onChange={(e) => {
                  handleChange(e.currentTarget.value);
                }}
                placeholder="Page Name"
                className="add-page-input"
              />
              <Button
                variant="outline-primary"
                type="button"
                className="add-page-btn"
                onClick={handleAddPage}
              >
                {` Add Page ${items.length}/5`}
              </Button>
            </Form>
          </div>
          <div className={`error-text-div${showVibrate ? " vibrate" : ""}`}>
            {(nameUsed || maxItemsReached) && (
              <p className="text-danger mb-0 padding-left-1rem d-block">
                {maxItemsReached
                  ? "You cannot add more than 5 items."
                  : "Page name already used."}
              </p>
            )}
          </div>

          <ul className="page-name-list">
            {items.map((item, index) => (
              <ListItem
                key={index}
                text={item.name}
                onDelete={() => handleDelete(item.name)}
              />
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

const ListItem = ({ text, onDelete }) => {
  return (
    <li>
      {text}
      <button onClick={onDelete}>
        <img alt="delete icon" src={deleteimg}></img>
      </button>
    </li>
  );
};

export default Step3;
