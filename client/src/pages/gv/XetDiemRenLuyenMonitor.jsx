import FormChonHocKi from "components/FormChonHocKi";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const XetDiemRenLuyenMonitor = ({ maLop }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const maHK = searchParams.get("maHK");
  const [value, setValue] = useState(maHK || "");

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/quanlylopchunhiem/${maLop}/${value}`);
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

export default XetDiemRenLuyenMonitor;
