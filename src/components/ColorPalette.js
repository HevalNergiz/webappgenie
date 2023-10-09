import React from "react";

function ColorPalette(props) {
  const { colors, onColorSelect } = props;

  const handleClick = (color) => {
    onColorSelect(color);
  };

  const colorItems = colors.map((color) => (
    <span
      key={color}
      className="color-item"
      style={{ backgroundColor: color }}
      onClick={() => handleClick(colors)}
    />
  ));

  return <div className="color-palette">{colorItems}</div>;
}

export default ColorPalette;
