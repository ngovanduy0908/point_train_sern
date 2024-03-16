import FormChonHocKi from "components/FormChonHocKi";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPointByMaAdmin } from "utils/getDetails/getPointByMaAdmin";

const PhieuChamDiem = () => {
  const { currentUser, maHKAdmin } = useContext(AuthContext);
  // console.log("currentUser: ", currentUser, maHKAdmin);
  // const searchParams = new URLSearchParams(location.search);
  // const maHK = searchParams.get("maHK");
  const { maHK } = useParams();
  const [value, setValue] = useState(maHK || "");
  const fetchData = async () => {
    try {
      const res = await getPointByMaAdmin(
        `maSv=${currentUser?.maSv}&maHK=${maHK}`
      );
      console.log("res: ", res);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // console.log(maHK);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // navigate(`/chamdiemrenluyen/${value}`);
    try {
      const res = await getPointByMaAdmin(
        `maSv=${currentUser?.maSv}&maHK=${value}`
      );
      console.log("res học kì: ", res?.maHK);
      if (res?.point_teacher >= 50 && res?.maHK === maHKAdmin) {
        toast.warn(
          "Thời gian này dành cho các sinh viên sinh hoạt lớp bổ sung"
        );
      } else {
        navigate(`/chamdiemrenluyen/${value}`);
      }
    } catch (error) {
      console.log("error: ", error);
    }
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
