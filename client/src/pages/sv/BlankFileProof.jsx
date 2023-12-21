import { useTheme } from "@mui/material";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentProofMark } from "utils/getDetails/getStudentProofMark";
function extractFileName(input) {
  const regex = /-(.*?)\.[^.]*$/;
  const match = input.match(regex);
  return match ? match[1] : input;
}
const BlankFileProof = () => {
  const { currentUser } = useContext(AuthContext);
  const [listProof, setListProof] = useState([]);
  //   console.log("maHK: ", maHK);
  const { maHK } = useParams();

  const theme = useTheme();
  const getProofStudent = async () => {
    const res = await getStudentProofMark(`${maHK}/${currentUser.maSv}`);
    // console.log("vao day: ", res);
    const newData = res[0].name_img ? res[0].name_img.split(",") : [];

    setListProof(newData);
  };
  useEffect(() => {
    getProofStudent();
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.print();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 items-center justify-center">
        {listProof.map((image, index) => (
          <div>
            <span
              style={{
                color: `${theme.palette.secondary[100]}`,
              }}
            >
              Tên ảnh: <strong>{extractFileName(image)}</strong>
            </span>
            <div className="cursor-pointer relative a">
              <img
                key={index}
                src={`/upload/${image}`}
                alt={`Uploaded ${index}`}
                width="500"
                className="object-contain transition ease-in-out  duration-[300ms]  hover:opacity-80"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlankFileProof;
