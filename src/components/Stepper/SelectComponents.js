import React from "react";
import CustomRadio from "../../components/CustomRadio";
import ColorPalette from "../../components/ColorPalette";
import { Col } from "react-bootstrap";
import TrendCard from "../../components/TrendCard";

export function SelectColors({ id, name, colorPalette }) {
  const handleColorSelect = (color) => {
    window.localStorage.setItem("selectedColor", color);
  };

  return (
    <Col xs={12} md={6} lg={4}>
      <CustomRadio
        id={id}
        name={name}
        label={
          <ColorPalette
            colors={colorPalette}
            onColorSelect={handleColorSelect}
          />
        }
        checked={true}
      />
    </Col>
  );
}

export function SelectTrend({ id, name, styles, onStyleSelect }) {
  return (
    <Col xs={12} md={6} lg={4}>
      <CustomRadio
        id={id}
        name={name}
        label={<TrendCard styles={styles} onStyleSelect={onStyleSelect} />}
        checked={true}
      />

      <p
        className={`py-2 px-3 text-white fw-light glass ${
          styles === "glass" ? "show" : "hide"
        }`}
      >
        A web trend with frosted glass aesthetics, blurred backgrounds, and
        translucent layers for immersive UI.
      </p>
      <p
        className={`py-2 px-3 text-white fw-light minimal ${
          styles === "minimal" ? "show" : "hide"
        }`}
      >
        A web trend that uses minimal design principles, with a focus on clean
        layouts, simple typography, and ample whitespace.
      </p>
      <p
        className={`py-2 px-3 text-white fw-light flat ${
          styles === "flat" ? "show" : "hide"
        }`}
      >
        A web trend that uses flat design principles, with a focus on simplicity
        and clarity, featuring crisp edges, bold colors, and a minimalist
        aesthetic.
      </p>
    </Col>
  );
}
