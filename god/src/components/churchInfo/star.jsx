import React from "react";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";

const Rating = ({ rating }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[...Array(5)].map((_, index) => (
        <StarsRoundedIcon
          key={index}
          style={{ color: index < rating ? "black" : "#C0C0C0", fontSize: "40px" }}
        />
      ))}
    </div>
  );
};

export default Rating;
