import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const ValidatedTextField = ({
  label,
  onBlur,
  isRequired,
  isEmail,
  value,
  onChange,
  ...props
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    // Kiểm tra điều kiện validate
    if (isRequired && value.trim() === "") {
      setError("This field is required");
    } else if (isEmail && !isValidEmail(value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }

    // Gọi hàm onBlur nếu nó được truyền vào
    if (onBlur) {
      onBlur();
    }
  };

  const handleChange = (event) => {
    // Gọi hàm onChange để cập nhật giá trị từ thằng cha
    onChange(event.target.value);
  };

  const isValidEmail = (value) => {
    // Hàm kiểm tra định dạng email (đơn giản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(error)}
      helperText={error}
      {...props}
    />
  );
};

export default ValidatedTextField;
