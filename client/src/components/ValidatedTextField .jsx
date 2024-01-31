import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const ValidatedTextField = ({
  label,
  onBlur,
  isRequired,
  isEmail,
  value,
  onChange,
  type = "text",
  ...props
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    // Kiểm tra điều kiện validate
    if (isRequired && value.trim() === "") {
      setError("Trường này không được để trống");
    } else if (isEmail && !isValidEmail(value)) {
      setError("Vui lòng nhập đúng định dạng email");
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
      type={type}
      {...props}
    />
  );
};

export default ValidatedTextField;
