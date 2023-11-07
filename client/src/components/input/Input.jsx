import React from "react";

const Input = ({ type, name, id = "", min, max, value, handleChangeInput }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      min={min}
      max={max}
      value={value}
      onChange={handleChangeInput}
    />
  );
};

export default Input;
