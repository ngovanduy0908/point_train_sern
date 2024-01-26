// CustomIcon.jsx
import React from "react";

const CustomIcon = ({ icon, color, ...props }) => {
  return React.cloneElement(icon, {
    ...props,
    sx: {
      width: "100%",
      height: "100%",
      color: color || "#fff",
      ...(icon.props.sx || {}), // Giữ lại các thuộc tính sx đã có trong icon
    },
  });
};

export default CustomIcon;
