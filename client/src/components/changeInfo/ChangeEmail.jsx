import { Button, Grid } from "@mui/material";
import axios from "axios";
import ValidatedTextField from "components/ValidatedTextField ";
import Modal from "components/modal/Modal";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { generateRandomNumberString } from "utils/function/randomNumber";
import { sendEmail } from "utils/postDetails/sendEmail";

const ChangeEmail = ({ setOpen, setOpenFather }) => {
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
  const [valueEmail, setValueEmail] = useState(currentUser.email);
  const [modalXacThuc, setModalXacThuc] = useState(false);
  const [verifyValue, setVerifyValue] = useState();
  const [verify, setVerify] = useState();
  const handleValue = (e) => {
    setValueEmail(e);
  };
  const handleChangeVerify = (e) => {
    setVerifyValue(e);
  };
  const handleSendEmail = async () => {
    try {
      const randomNumber = generateRandomNumberString();
      const valueData = {
        to: valueEmail,
        subject: "Thay đổi email",
        text: "Mã xác thực của bạn là",
        randomNumber,
        svOrGv: currentUser?.role_id === "2" ? "2" : "1",
      };
      const res = await sendEmail(valueData);
      // console.log("res: ", res);
      if (res) {
        setVerify(res);
        toast.success("Mã xác thực đã được gửi về email.");
        setModalXacThuc(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const handleClick = async () => {
    try {
      if (verify !== verifyValue)
        return toast.error("Mã xác thực không chính xác");
      const svOrGv = currentUser?.role_id === 2 ? "2" : "1";
      const query = `maSv=${currentUser?.maSv}&maGv=${currentUser?.maGv}&svOrGv=${svOrGv}`;
      // console.log("qeury: ", query);
      // const res = await axios.post(``)
      const values = {
        email: valueEmail,
      };
      await axios.post(
        `http://localhost:8800/api/students/change_email?${query}`,
        values,
        {
          withCredentials: true,
        }
      );
      const newData = {
        ...currentUser,
        email: valueEmail,
      };
      localStorage.setItem("user", JSON.stringify(newData));
      toast.success("Thay đổi email thành công");
      setModalXacThuc(false);
      setOpen(false);
      setOpenFather(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className="mt-5">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ValidatedTextField
            isRequired
            isEmail
            label="Email"
            value={valueEmail}
            onChange={handleValue}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSendEmail()}
            //   startIcon={<RemoveRedEyeIcon />}
          >
            Lấy mã
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={modalXacThuc}
        setOpen={setModalXacThuc}
        classNameChildren={"w-[800px]"}
        displayButtonOk={false}
        displayButtonCancel={false}
        title="Nhập mã xác thực đã được gửi về Email"
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ValidatedTextField
              isRequired
              label="Mã Xác Thực"
              value={verifyValue}
              onChange={handleChangeVerify}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClick()}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ChangeEmail;
