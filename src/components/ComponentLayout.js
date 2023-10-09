import React, { useEffect, useState } from "react";
import { Container, Col, Row, Nav, Tab, Card } from "react-bootstrap";
import { NewAccordion } from "./NewAccordion";
import ComponentCheckbox from "./ComponentCheckbox";

const ComponentLayout = (props) => {
  const [checkedComponents, setCheckedComponents] = useState([]);
  const [selectedCounts, setSelectedCounts] = useState({});
  const [pages, setPages] = useState();
  const { onCheckedComponentsChange } = props;

  useEffect(() => {
    if (onCheckedComponentsChange) {
      onCheckedComponentsChange(checkedComponents);
    }
  }, [checkedComponents]);

  const handleTextAreaChange = (id, value) => {
    setCheckedComponents((prevCheckedComponents) =>
      prevCheckedComponents.map((page) => ({
        ...page,
        components: page.components.map((component) => {
          const [pageName, componentName] = id.split("|");
          return component.componentName === componentName
            ? { ...component, message: value }
            : component;
        }),
      }))
    );
  };

  const handleCheckedChange = (id, isChecked, event) => {
    if (isChecked && (selectedCounts[id.split("|")[0]] || 0) >= 3) {
      alert("You cannot select more than 3 items per page.");
      console.log(event.target);
      return;
    }

    setSelectedCounts((prevSelectedCounts) => {
      const [pageName, componentName] = id.split("|");
      const newCount = isChecked
        ? (prevSelectedCounts[pageName] || 0) + 1
        : (prevSelectedCounts[pageName] || 0) - 1;

      return {
        ...prevSelectedCounts,
        [pageName]: newCount,
      };
    });
  };

  useEffect(() => {
    const pageData = window.localStorage.getItem("pages");
    setPages(JSON.parse(pageData));
  }, []);

  return (
    <div className="d-flex">
      <Container>
        <Tab.Container defaultActiveKey="1">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {pages &&
                  pages.map((page) => (
                    <Nav.Item key={page.id}>
                      <Nav.Link eventKey={page.id}>
                        {" "}
                        {page.name}{" "}
                        {selectedCounts[page.name] > 0 && (
                          <span className="badge selected-component-number">
                            {selectedCounts[page.name]}
                          </span>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {pages &&
                  pages.map((page) => {
                    return (
                      <Tab.Pane key={page.id} eventKey={page.id}>
                        <NewAccordion title="Charts">
                          <p>You're selecting for page {page.name}</p>
                          <Row>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|bar chart`}
                                label="Bar Chart"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="bar-chart-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|area chart`}
                                label="Area Chart"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="area-chart-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|pie chart`}
                                label="Pie Chart"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="pie-chart-cover"
                              />
                            </Col>
                          </Row>
                        </NewAccordion>
                        <NewAccordion title="Form">
                          <Row>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|text input`}
                                label="Text Input"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="text-input-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|password input`}
                                label="Password Input"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="password-input-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|select input`}
                                label="Select Input"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="select-input-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|radio group`}
                                label="Radio Group"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="radio-group-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|checkbox`}
                                label="Checkbox"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="checkbox-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|date picker`}
                                label="Date Picker"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="date-picker-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|time picker`}
                                label="Time Picker"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="time-picker-cover"
                              />
                            </Col>
                            <Col md={4}>
                              <ComponentCheckbox
                                id={`${page.name}|file input`}
                                label="File Input"
                                onTextAreaChange={handleTextAreaChange}
                                onCheckedChange={handleCheckedChange}
                                className="file-input-cover"
                              />
                            </Col>
                          </Row>
                        </NewAccordion>
                      </Tab.Pane>
                    );
                  })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};
export default ComponentLayout;
