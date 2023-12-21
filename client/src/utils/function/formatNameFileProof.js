export function formatNameFileProof(filePath) {
  /// Tìm vị trí của dấu "."
  const dotIndex = filePath.lastIndexOf(".");

  // Tìm vị trí của dấu "-"
  const dashIndex = filePath.lastIndexOf("-");

  // Kiểm tra xem có dấu "." và có dấu "-" sau dấu "." không
  if (dotIndex > dashIndex) {
    // Sử dụng substring để lấy phần tên file từ vị trí sau dấu "-" đến vị trí trước dấu "."
    const fileName = filePath.substring(dashIndex + 1, dotIndex);
    return fileName;
  } else {
    // Nếu không có dấu "-" sau dấu ".", sử dụng substring để lấy từ vị trí sau dấu "-"
    const fileName = filePath.substring(dashIndex + 1);
    return fileName;
  }
}
