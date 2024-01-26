import { LinearProgress } from "@mui/material";
import React from "react";

const Progress = ({ colorValue = "success" }) => {
  return <LinearProgress color={`${colorValue}`} />;
};

export default Progress;
