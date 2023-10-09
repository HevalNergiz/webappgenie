import React from "react";
import { Row, Col } from "react-bootstrap";
import { style1, style2, style3 } from "../../data/styles";
import { SelectTrend } from "./SelectComponents";

const Step2 = () => {
  return (
    <div>
      <Row>
        <SelectTrend
          id="trend1"
          name="trendGroup1"
          styles={style1}
          onStyleSelect={(styles) =>
            window.localStorage.setItem("style", styles)
          }
        />
        <SelectTrend
          id="trend2"
          name="trendGroup1"
          styles={style2}
          onStyleSelect={(styles) =>
            window.localStorage.setItem("style", styles)
          }
        />
        <SelectTrend
          id="trend3"
          name="trendGroup1"
          styles={style3}
          onStyleSelect={(styles) =>
            window.localStorage.setItem("style", styles)
          }
        />
      </Row>
    </div>
  );
};

export default Step2;
