import { Box } from "@mui/material";
import DanhSachSinhVienSHL from "components/admin/DanhSachSinhVienSHL";
import DeadlineAdmin from "components/admin/DeadlineAdmin";
import React from "react";
import { useParams } from "react-router-dom";

const SinhHoatBoSungDetail = () => {
  const { maHK } = useParams();
  return (
    <Box m="1.5rem 2.5rem">
      <DeadlineAdmin maHK={maHK} />
      <DanhSachSinhVienSHL maHK={maHK} />
    </Box>
  );
};

export default SinhHoatBoSungDetail;
