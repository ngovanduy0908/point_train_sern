import { Box, IconButton, Tooltip } from "@mui/material";
import Badge from "components/Badge";
import React, { useEffect, useMemo, useState } from "react";
import { getListPointStudentAdmin } from "utils/getMany/getListPointStudentAdmin";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import DoNotStepIcon from "@mui/icons-material/DoNotStep";
import MaterialReactTable from "material-react-table";
import Header from "components/Header";

const DanhSachSinhVienSHL = ({ maHK }) => {
  const [danhSachDiemSinhVien, setDanhSachDiemSinhVien] = useState([]);
  const [sinhVienItem, setSinhVienItem] = useState();
  const [openFormDRL, setOpenFormDRL] = useState(false);
  const [openFormMinhChung, setOpenFormMinhChung] = useState(false);
  const [openFormConfirm, setOpenFormConfirm] = useState(false);
  const fetchData = async () => {
    try {
      const res = await getListPointStudentAdmin(`${maHK}`);
      console.log("res: ", res);
      const newData = res.map((item, idx) => ({
        STT: idx + 1,
        ...item,
      }));
      setDanhSachDiemSinhVien(newData);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "STT",
        header: "STT",
        minSize: 40, //min size enforced during resizing
        maxSize: 100, //max size enforced during resizing
        size: 40, //medium column
      },
      {
        accessorKey: "maSv",
        header: "MSSV",
        size: 140,
      },
      {
        accessorKey: "name",
        header: "Họ Và Tên",
        size: 140,
      },
      {
        accessorKey: "maLop",
        header: "Lớp",
        size: 50,
      },
      {
        accessorKey: "point_student",
        header: "Điểm SV",
        size: 40, //medium column
      },

      {
        accessorKey: "point_teacher",
        header: "Điểm HĐ Khoa",
        size: 120,
      },
      {
        accessorKey: "status",
        header: "Trạng Thái",
        size: 140,
        Cell: ({ cell, row }) => {
          const status = row.original.status_admin;
          return (
            <Box>
              <Badge
                label={`${status === 0 ? "Chưa duyệt" : "Đã duyệt"}`}
                className={`${
                  status === 0
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                } `}
              />
            </Box>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Thao tác",
        size: 140,
        Cell: ({ cell, row }) => {
          // console.log("row trong thao tacs: ", row.original);
          const status = row.original.status;
          return (
            <Box>
              <Tooltip
                title={`${
                  status === 0 ? "Duyệt điểm rèn luyện" : "Sửa điểm rèn luyện"
                }`}
              >
                <IconButton
                  onClick={() => {
                    setOpenFormDRL(true);
                    setSinhVienItem(row.original);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xem minh chứng">
                <IconButton
                  onClick={() => {
                    setSinhVienItem(row.original);
                    setOpenFormMinhChung(true);
                  }}
                >
                  <PreviewIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xét điểm = 0 do SV không sinh hoạt lớp">
                <IconButton
                  onClick={() => {
                    setSinhVienItem(row.original);
                    setOpenFormConfirm(true);
                  }}
                >
                  <DoNotStepIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [danhSachDiemSinhVien]
  );

  // minh chung
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [handleChangeFile, setHandleChangeFile] = useState(false);
  const [chooseFiles, setChooseFiles] = useState([]);
  const handleUpload = async () => {
    // TODO khi file change thì mới call api upload img
    let file_img = null;
    let choose_file = chooseFiles;
    // console.log("choose_file: ", choose_file);
    if (handleChangeFile) {
      try {
        // console.log("change file: ", selectedFiles);
        // console.log("change file v1: ", selectedFiles);

        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("images", file);
        });
        // await axios.post(`${DOMAIN}/upload`, formData).then(async (res) => {
        //   file_img = res.data.join(",");
        //   // choose_file = [...chooseFiles, file_img];
        //   choose_file = [file_img];
        //   const values = {
        //     name_image: choose_file.length ? choose_file.join(",") : "",
        //     maSv: sinhVienItem?.maSv,
        //   };
        //   // console.log("values: ", choose_file);
        //   await axios
        //     .post(
        //       `${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`,
        //       values,
        //       {
        //         withCredentials: true,
        //       }
        //     )
        //     .then(async (res) => {
        //       toast.success(res.data);
        //     });
        // });
      } catch (error) {
        console.error("Upload error:", error);
      }
    } else {
      try {
        const values = {
          name_image: chooseFiles.length ? chooseFiles.join(",") : "",
          maSv: sinhVienItem?.maSv,
        };
        // console.log("values moi: ", values);
        // await axios
        //   .post(`${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`, values, {
        //     withCredentials: true,
        //   })
        //   .then(async (res) => {
        //     toast.success(res.data);
        //   });
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  useEffect(() => {
    if (openFormMinhChung === false) {
      setHandleChangeFile(false);
    }
  }, [openFormMinhChung]);
  const handleConfirm = async () => {
    try {
      const values = {
        text: "Không sinh hoạt lớp",
      };
      //   await axios.post(
      //     `${DOMAIN}/points/confirm_zero?maSv=${sinhVienItem?.maSv}&maHK=${maHK}`,
      //     values,
      //     {
      //       withCredentials: true,
      //     }
      //   );
      //   // console.log("res:", res);
      //   toast.success("Thay đổi điểm thành công");
      //   fetchData();
      //   setOpenFormConfirm(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header subtitle="Danh sách sinh viên" />
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 50,
          },
        }}
        columns={columns}
        data={danhSachDiemSinhVien}
        editingMode="modal"
        enableColumnOrdering
      />
    </div>
  );
};

export default DanhSachSinhVienSHL;
