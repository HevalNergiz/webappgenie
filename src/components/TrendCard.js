import React from "react";

const TrendCard = ({ className, styles, onStyleSelect, ...props }) => {
  const handleClick = () => {
    onStyleSelect(styles);
  };

  return (
    <div
      className={`trend-card ${className} ${styles}`}
      onClick={handleClick}
      {...props}
    >
      <div className="trend-card-cover"></div>
    </div>
  );
};

export default TrendCard;
