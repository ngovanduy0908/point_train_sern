export const isAnyFieldEmpty = (values) => {
  return Object.values(values).some((value) => value === "");
};

export const isCheckSomeFieldEmpty = (values, keysToCheck) => {
  if (!keysToCheck || keysToCheck.length === 0) {
    throw new Error("Vui lòng cung cấp danh sách keys cần kiểm tra.");
  }

  return keysToCheck.some((key) => !values[key] || values[key] === "");
};

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
