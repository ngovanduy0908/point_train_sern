export function generateRandomNumberString() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
  return randomNumber.toString();
}
