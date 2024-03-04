import { Box } from "@mui/material";
import FormChonHocKi from "components/FormChonHocKi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SinhHoatBoSung = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/sinhhoatbosung/${value}`);
    // console.log("value hihi: ", value);
  };
  return (
    <Box m="1.5rem 2.5rem">
      {/* <Header title="SINH HOẠT" subtitle="Công tác chính trị sinh viên" /> */}
      <div>
        <FormChonHocKi
          onSubmit={handleSubmit}
          value={value}
          setValue={setValue}
        />
      </div>
    </Box>
  );
};

export default SinhHoatBoSung;
