import axios from "axios";
import React from "react";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const GenerateExcel = ({ dataValue }) => {
  // console.log(dataValue);
  const modifiedDataValue = dataValue?.map((item) => {
    return {
      ...item,
      ho_ngheo: item["Hộ nghèo"],
      can_ngheo: item["Cận nghèo"],
    };
  });
  // if (dataValue) {
  const value = modifiedDataValue?.map((item, idx) => {
    return {
      ...item,
      khau_ngheo: item.ho_ngheo * 2,
      khau_can_ngheo: item.can_ngheo * 2,
      tong_so_ho: item.ho_ngheo + item.can_ngheo,
      tong_so_khau: item.ho_ngheo * 2 + item.can_ngheo * 2,
    };
  });
  // console.log("value: ", value);
  // }
  const exportFileXlsx = async () => {
    await axios.post(`${DOMAIN}/proof_mark/get_proof/excel`, value, {
      withCredentials: true,
    });
  };
  return (
    <div>
      <button onClick={() => exportFileXlsx()}>Xuất file excel theo mẫu</button>
    </div>
  );
};

export default GenerateExcel;
