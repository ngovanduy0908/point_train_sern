import { Button, Grid } from "@mui/material";
import axios from "axios";
import ValidatedTextField from "components/ValidatedTextField ";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePhone = ({ setOpen, setOpenFather }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Sử dụng useEffect để theo dõi sự thay đổi trong localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // Khi giá trị trong localStorage thay đổi, cập nhật currentUser
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };

    // Đăng ký sự kiện cho sự thay đổi trong localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Hủy đăng ký sự kiện khi component bị unmounted
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const [valuePhone, setValuePhone] = useState(currentUser?.phone_number);
  const handleValue = (e) => {
    setValuePhone(e);
  };
  const handleClick = async () => {
    try {
      const svOrGv = currentUser?.role_id === 2 ? "2" : "1";
      const query = `maSv=${currentUser?.maSv}&maGv=${currentUser?.maGv}&svOrGv=${svOrGv}`;
      const values = {
        phone: valuePhone,
      };
      await axios.post(
        `http://localhost:8800/api/students/change_phone?${query}`,
        values,
        {
          withCredentials: true,
        }
      );
      const newData = {
        ...currentUser,
        phone_number: valuePhone,
      };
      localStorage.setItem("user", JSON.stringify(newData));
      toast.success("Thay đổi số điện thoại thành công");
      setOpen(false);
      setOpenFather(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ValidatedTextField
            isRequired
            label="Số điện thoại"
            value={valuePhone}
            onChange={handleValue}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClick()}
            //   startIcon={<RemoveRedEyeIcon />}
          >
            Thay đổi
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePhone;
