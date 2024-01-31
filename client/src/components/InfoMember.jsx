import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Modal from "./modal/Modal";
import ChangeEmail from "./changeInfo/ChangeEmail";
import { AuthContext } from "context/authContext";
import ChangePhone from "./changeInfo/ChangePhone";
import Progress from "./Progress";

const InfoMember = ({ user, setOpenFather }) => {
  //   const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [openFormInfoEmail, setOpenFormInfoEmail] = useState(false);
  const [openFormInfoPhone, setOpenFormInfoPhone] = useState(false);
  // const [openFor]
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

  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {loading ? (
        <Progress />
      ) : (
        <div className="sm:col-span-6">
          <div className="mt-2">
            <label
              for="email"
              className="text-sm font-medium leading-6 mr-2 inline-block w-[20%]"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              value={`${currentUser?.email}`}
              className=" w-[60%] mr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenFormInfoEmail(true)}
              //   startIcon={<RemoveRedEyeIcon />}
            >
              Thay đổi
            </Button>
          </div>
          <div className="mt-2">
            <label
              for="phone_number"
              className="text-sm font-medium leading-6 mr-2 inline-block w-[20%]"
            >
              Số điện thoại:
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="phone_number"
              autocomplete="phone_number"
              value={`${currentUser?.phone_number || ""}`}
              className=" w-[60%] mr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenFormInfoPhone()}
              //   startIcon={<RemoveRedEyeIcon />}
            >
              Thay đổi
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={openFormInfoEmail}
        setOpen={setOpenFormInfoEmail}
        classNameChildren={"w-[800px]"}
        displayButtonOk={false}
        displayButtonCancel={false}
        title="Thay đổi email"
      >
        <ChangeEmail
          // open={openFormInfoEmail}
          setOpen={setOpenFormInfoEmail}
          setOpenFather={setOpenFather}
        />
      </Modal>
      <Modal
        open={openFormInfoPhone}
        setOpen={setOpenFormInfoPhone}
        classNameChildren={"w-[800px]"}
        displayButtonOk={false}
        displayButtonCancel={false}
        title="Thay đổi số điện thoại"
      >
        <ChangePhone
          setOpen={setOpenFormInfoPhone}
          setOpenFather={setOpenFather}
        />
      </Modal>
    </div>
  );
};

export default InfoMember;
