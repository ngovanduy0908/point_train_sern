import React, { useMemo } from "react";
import { Box } from "@mui/material";
import MaterialReactTable from "material-react-table";

const DanhSachSVChuaChamDRL = ({ danhSachSinhVienNoMark }) => {
  //   console.log("danhSachSinhVienNoMark: ", danhSachSinhVienNoMark);
  const columns = useMemo(
    () => [
      {
        accessorKey: "stt",
        header: "STT",
        size: 50,
      },
      {
        accessorKey: "maSv",
        header: "Mã Sinh Viên",
        size: 140,
      },
      {
        accessorKey: "name",
        header: "Họ Và Tên",
        size: 140,
      },
    ],
    [danhSachSinhVienNoMark]
  );
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={danhSachSinhVienNoMark}
          editingMode="modal"
          enableColumnOrdering
        />
      </Box>
    </Box>
  );
};

export default DanhSachSVChuaChamDRL;
