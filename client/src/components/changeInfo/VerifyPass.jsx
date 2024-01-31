import { Button, Grid } from "@mui/material";
import ValidatedTextField from "components/ValidatedTextField ";
import React, { useContext, useState } from "react";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { AuthContext } from "context/authContext";
import { getPass } from "utils/getDetails/getPass";
import { toast } from "react-toastify";
import axios from "axios";
const VerifyPass = ({ setOpen }) => {
  const { currentUser } = useContext(AuthContext);
  const svOrGv = currentUser?.role_id === "2" ? "2" : "1";

  const [isShowChangePassInput, setIsShowChangePassInput] = useState(false);
  const [text, setText] = useState(
    "Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin bằng cách nhập mật khẩu hiện tại của bạn"
  );
  const [valuePass, setValuePass] = useState();
  const [valueNew, setValueNew] = useState();
  const handleChange = (e) => {
    setValuePass(e);
  };
  const handleChangeNew = (e) => {
    setValueNew(e);
  };
  const handleClick = async () => {
    try {
      if (!valuePass) return toast.warn("Vui lòng nhập mật khẩu");
      const query = `maSv=${currentUser?.maSv}&maGv=${currentUser?.maGv}&svOrGv=${svOrGv}`;
      const res = await getPass(query);
      console.log("res: ", res);
      console.log("query: ", valuePass);
      //   if (!res)
      if (res?.password === valuePass) {
        const valueText = isShowChangePassInput
          ? `Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin bằng
          cách nhập mật khẩu hiện tại của bạn.`
          : `Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác`;
        setIsShowChangePassInput(true);
        setText(valueText);
      } else {
        return toast.error("Mật khẩu hiện tại không chính xác");
      }
      //   console.log("alo vao day: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePass = async () => {
    try {
      const query = `maSv=${currentUser?.maSv}&maGv=${currentUser?.maGv}&svOrGv=${svOrGv}`;
      const values = {
        pass: valueNew,
      };
      await axios.post(
        `http://localhost:8800/api/students/change_pass?${query}`,
        values,
        {
          withCredentials: true,
        }
      );
      const newData = {
        ...currentUser,
        password: valueNew,
      };
      localStorage.setItem("user", JSON.stringify(newData));
      toast.success("Thay đổi mật khẩu thành công");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <svg aria-hidden="true" width="80" height="80" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.348 54.153c-8.05-16.329-5.904-41.708-5.904-41.708 22.053.65 34.686-7.268 34.686-7.268v70.306c-13.094-5.7-20.277-11.185-20.277-11.185-5.076-3.943-8.505-10.145-8.505-10.145zM40.131 5.177s12.633 7.918 34.685 7.268c0 0 2.145 25.38-5.904 41.708 0 0-3.43 6.202-8.505 10.145 0 0-7.183 5.485-20.276 11.184V5.177z"
            fill="url(#paint0_linear)"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M69.355 16.767c-18.593.548-29.245-6.127-29.245-6.127v59.277c11.04-4.806 17.097-9.43 17.097-9.43 4.279-3.325 7.17-8.554 7.17-8.554 6.787-13.768 4.978-35.166 4.978-35.166z"
            fill="#FFEAEA"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.865 16.767s-1.809 21.398 4.978 35.166c0 0 2.891 5.23 7.17 8.554 0 0 6.057 4.624 17.097 9.43V10.64s-10.652 6.675-29.245 6.127z"
            fill="#fff"
          ></path>
          <path
            d="M51.808 29.967a2.273 2.273 0 113.334 3.09l-14.85 16.02c-.4.43-1.077.444-1.493.028l-1.749-1.75a1.037 1.037 0 01-.027-1.437l14.785-15.951z"
            fill="#EE4D2D"
          ></path>
          <path
            d="M28.377 36.8a2.27 2.27 0 013.105-.098l9.48 8.35a2.27 2.27 0 11-3 3.406l-9.48-8.349a2.27 2.27 0 01-.105-3.309z"
            fill="#EE4D2D"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="5.185"
              y1="5.177"
              x2="5.185"
              y2="75.483"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F53D2D"></stop>
              <stop offset="1" stop-color="#F63"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p>{text}</p>
      {isShowChangePassInput ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <ValidatedTextField
                isRequired
                label={"Mật khẩu mới"}
                value={valueNew}
                onChange={handleChangeNew}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleChangePass()}
                startIcon={<HttpsOutlinedIcon />}
              >
                Thay đổi
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <ValidatedTextField
                isRequired
                label={"Mật khẩu"}
                value={valuePass}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClick()}
                startIcon={<HttpsOutlinedIcon />}
              >
                Xác thực
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default VerifyPass;
