export const isAnyFieldEmpty = (values) => {
  return Object.values(values).some((value) => value === "");
};

export const isCheckSomeFieldEmpty = (values, keysToCheck) => {
  if (!keysToCheck || keysToCheck.length === 0) {
    throw new Error("Vui lòng cung cấp danh sách keys cần kiểm tra.");
  }

  return keysToCheck.some((key) => !values[key] || values[key] === "");
};
