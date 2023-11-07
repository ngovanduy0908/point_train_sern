import { Box } from "@mui/material";
import FormChonHocKi from "components/FormChonHocKi";
import Header from "components/Header";
import { getUserInLocalStorage } from "context/getCurrentUser";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DOMAIN = process.env.REACT_APP_DOMAIN;

const XetDiemRenLuyen = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const maHK = searchParams.get("maHK");
  const [value, setValue] = useState(maHK || "");

  // console.log(maHK);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/xetdiemrenluyen/${value}`);
  };

  return (
    <>
      <FormChonHocKi
        onSubmit={handleSubmit}
        value={value}
        setValue={setValue}
      />
    </>
  );
};

export default XetDiemRenLuyen;
