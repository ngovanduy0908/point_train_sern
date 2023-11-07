import FormChonHocKi from "components/FormChonHocKi";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PhieuChamDiem = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const maHK = searchParams.get("maHK");
  const [value, setValue] = useState(maHK || "");

  // console.log(maHK);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/chamdiemrenluyen/${value}`);
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

export default PhieuChamDiem;
