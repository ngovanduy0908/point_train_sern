import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { getStudentProofMark } from "utils/getDetails/getStudentProofMark";
import { Button, useTheme } from "@mui/material";
import EmptyState from "components/EmptyState";
function extractFileName(input) {
  const regex = /-(.*?)\.[^.]*$/;
  const match = input.match(regex);
  return match ? match[1] : input;
}
const SeeProof = ({ maHK }) => {
  const { currentUser } = useContext(AuthContext);
  const [listProof, setListProof] = useState([]);
  //   console.log("maHK: ", maHK);
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

  const printProof = () => {
    window.open(`/print-proof/${maHK}`, "_blank");
  };

  return (
    <div>
      {listProof.length > 0 && (
        <Button
          color="secondary"
          variant="contained"
          sx={{
            width: "30%",
            marginBottom: "5px",
          }}
          onClick={() => printProof()}
        >
          In minh chứng
        </Button>
      )}
      {listProof.length > 0 ? (
        <div
          className="p-2 border-gray-800 rounded-lg max-h-[70vh] overflow-auto"
          style={{
            border: "2px solid",
          }}
        >
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
      ) : (
        <EmptyState title="Không có minh chứng nào" />
      )}
    </div>
  );
};

export default SeeProof;
