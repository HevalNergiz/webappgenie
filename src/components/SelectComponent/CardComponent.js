import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardInput from "../SelectComponent/CardInput";

const CardComponent = ({ option, pageId, isSelected, handleCardClick }) => {
  return (
    <Card
      key={option.value}
      sx={{
        minWidth: 120,
        maxWidth: 120,
        border: isSelected(pageId, option.value)
          ? "1px solid green"
          : "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <CardActionArea onClick={() => handleCardClick(pageId, option.value)}>
        <CardContent>
          <Typography>{option.label}</Typography>
          {isSelected(pageId, option.value) && (
            <CheckCircleIcon
              sx={{
                color: "green",
                position: "absolute",
                top: 8,
                right: 8,
              }}
            />
          )}
        </CardContent>
      </CardActionArea>
      {isSelected(pageId, option.value) && (
        <CardInput
          cardId={`${option.value}`}
          onSave={(cardId, inputValue) =>
            console.log(
              `Saved message for component ${cardId}: ${inputValue}`
            )
          }
        />
      )}
    </Card>
  );
};

export default CardComponent;
