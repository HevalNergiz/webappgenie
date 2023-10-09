import React, { useEffect, useReducer, useRef } from "react";
import { Accordion } from "react-bootstrap-accordion";
import "react-bootstrap-accordion/dist/index.css";

function reducer(state, action) {
  switch (action.type) {
    case "collapse":
      return {
        collapse: !state.collapse,
      };
    case "show":
      return {
        collapse: true,
      };
  }
}

export function NewAccordion({ show = false, children, title }) {
  const accordionBodyRef = useRef(null);
  const [{ collapse }, dispatch] = useReducer(reducer, {
    collapse: show,
  });

  const randomId = useRef(
    window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
  );

  useEffect(() => {
    if (show) dispatch({ type: "show" });
  }, []);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${randomId.current}`}>
        <button
          className={`accordion-button${collapse ? "" : " collapsed"}`}
          type="button"
          aria-expanded={collapse}
          aria-controls={`collapse-${randomId.current}`}
          onClick={() => dispatch({ type: "collapse" })}
        >
          {title}
        </button>
      </h2>

      <div
        id={`collapse-${randomId.current}`}
        aria-labelledby={`heading-${randomId.current}`}
        className={`accordion-collapse`}
        style={
          collapse
            ? {
                minHeight: "150px",
                height: accordionBodyRef.current?.clientHeight,
                transition: "height 0.2s ease",
              }
            : {
                height: 0,
                transition: "height 0.2s ease",
                overflow: "hidden",
              }
        }
      >
        <div className="accordion-body" ref={accordionBodyRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
