import React, { useState } from "react";
import CustomRadio from "../../components/CustomRadio";
import ColorPalette from "../../components/ColorPalette";

import { colorPalette1, colorPalette2, colorPalette3 } from "../../data/colors";
import { Row, Col } from "react-bootstrap";
import { SelectColors, SelectTrend } from "./SelectComponents";

const Step1 = () => {
  return (
    <div>
      <Row>
        <SelectColors
          id="color1"
          name="colorGroup1"
          colorPalette={colorPalette1}
        />
        <SelectColors
          id="color2"
          name="colorGroup1"
          colorPalette={colorPalette2}
        />
        <SelectColors
          id="color3"
          name="colorGroup1"
          colorPalette={colorPalette3}
        />
      </Row>
    </div>
  );
};

export default Step1;
