import { getUserInLocalStorage } from "context/getCurrentUser";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { getPointStudentByMaLopAndMaHK } from "utils/getDetails/getPointDanhSachLop";
import { getStudentsNoMark } from "utils/getMany/getStudentsNoMark";
import { markZero } from "utils/postDetails/markZero";
import Header from "components/Header";
import Badge from "components/Badge";
import Modal from "components/modal/Modal";
import ModalV1 from "components/modal/ModalV1";
import DuyetDiemRenLuyenLT from "./DuyetDiemRenLuyenLT";
import UploadProofStudent from "components/student/UploadProofStudent";
import { toast } from "react-toastify";
import axios from "axios";
import DanhSachSVChuaChamDRL from "./DanhSachSVChuaChamDRL";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const DanhSachDRLSinhVien = ({ socket }) => {
  // console.log("vao dan hsach sinh vien: ", socket);
  const currentUser = getUserInLocalStorage();
  const { maHK } = useParams();
  const maLop = currentUser?.maLop;
  const [danhSachDiemSinhVien, setDanhSachDiemSinhVien] = useState([]);
  const [danhSachSinhVienNoMark, setDanhSachSinhVienNoMark] = useState([]);
  const [sinhVienItem, setSinhVienItem] = useState();
  const [openFormDRL, setOpenFormDRL] = useState(false);
  const [openFormMinhChung, setOpenFormMinhChung] = useState(false);
  const [openDSSVNoMark, setOpenDSSVNoMark] = useState(false);

  const fetchData = async () => {
    const res = await getPointStudentByMaLopAndMaHK(
      `maHK=${maHK}&maLop=${currentUser.maLop}`
    );
    const newData = res.map((item, idx) => ({
      STT: idx + 1,
      ...item,
    }));
    setDanhSachDiemSinhVien(newData);
    // console.log("res: ", res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "STT",
        header: "STT",
        size: 50,
      },
      {
        accessorKey: "maSv",
        header: "Mã Sinh Viên",
        size: 140,
      },
      {
        accessorKey: "name",
        header: "Họ Và Tên",
        size: 140,
      },
      {
        accessorKey: "point_student",
        header: "DRL sinh viên chấm",
        size: 50,
      },
      {
        accessorKey: "point_monitor",
        header: "DRL lớp trưởng chấm",
        size: 50,
      },
      {
        accessorKey: "status",
        header: "Trạng Thái",
        size: 140,
        Cell: ({ cell, row }) => {
          const status = row.original.status;
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
        await axios.post(`${DOMAIN}/upload`, formData).then(async (res) => {
          file_img = res.data.join(",");
          // choose_file = [...chooseFiles, file_img];
          choose_file = [file_img];
          const values = {
            name_image: choose_file.length ? choose_file.join(",") : "",
            maSv: sinhVienItem?.maSv,
          };
          // console.log("values: ", choose_file);
          await axios
            .post(
              `${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`,
              values,
              {
                withCredentials: true,
              }
            )
            .then(async (res) => {
              toast.success(res.data);
            });
        });
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
        await axios
          .post(`${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`, values, {
            withCredentials: true,
          })
          .then(async (res) => {
            toast.success(res.data);
          });
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
  // end minh chung

  // loc sinh vien chua cham drl
  const getDanhSachSinhVienNoMark = async () => {
    const res = await getStudentsNoMark(`maHK=${maHK}&maLop=${maLop}`);
    const data = res.map((item, idx) => ({
      stt: idx + 1,
      ...item,
    }));
    setDanhSachSinhVienNoMark(data);
    // console.log("res: ", res);
  };

  useEffect(() => {
    getDanhSachSinhVienNoMark();
  }, []);

  const handleMarkZero = async () => {
    try {
      if (!window.confirm(`Bạn có chắc muốn xét điểm bằng 0?`)) {
        return;
      }
      if (!danhSachSinhVienNoMark.length) {
        return toast.warn("Không có sinh viên nào chưa chấm điểm.");
      }
      const newData = danhSachSinhVienNoMark.map((item) => ({
        maHK,
        maSv: item.maSv,
      }));
      // console.log("cllick vao day duoc khong");

      await axios
        .post(`${DOMAIN}/points/mark_zero`, newData, {
          withCredentials: true,
        })
        .then(() => {
          fetchData();
          getDanhSachSinhVienNoMark();
          setOpenDSSVNoMark(false);
          toast.success("Chấm điểm rèn luyện thành công", {
            autoClose: 2000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={`Danh Sách Sinh Viên Lớp - ${currentUser?.maLop}`}
        subtitle={`Xét Duyệt Điểm Rèn Luyện - ${maHK}`}
      />
      <Button
        variant="contained"
        sx={{
          margin: "5px 0px 15px",
        }}
        onClick={() => {
          setOpenDSSVNoMark(true);
        }}
      >
        Danh Sách Sinh Viên Chưa Chấm ĐRL
      </Button>
      <Box>
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={danhSachDiemSinhVien}
          editingMode="modal"
          enableColumnOrdering
        />
      </Box>

      <ModalV1
        open={openFormDRL}
        setOpen={setOpenFormDRL}
        title={`Điểm rèn luyện của ${sinhVienItem?.name}  `}
        changeHeight={true}
        displayButtonOk={false}
      >
        <DuyetDiemRenLuyenLT
          fetchData={fetchData}
          setOpen={setOpenFormDRL}
          sinhVienItem={sinhVienItem}
          currentUser={currentUser}
          socket={socket}
        />
      </ModalV1>

      {/* danh sach sinh vien chua cham diem ren luyen */}
      <ModalV1
        open={openDSSVNoMark}
        setOpen={setOpenDSSVNoMark}
        title="Danh Sách Sinh Viên Không Chấm Điểm Rèn Luyện"
        changeHeight={true}
        okText="Xét Điểm Rèn Luyện Bằng 0"
        onOK={handleMarkZero}
      >
        <DanhSachSVChuaChamDRL
          danhSachSinhVienNoMark={danhSachSinhVienNoMark}
        />
      </ModalV1>
      {sinhVienItem && (
        <Modal
          open={openFormMinhChung}
          setOpen={setOpenFormMinhChung}
          title={"Xét Duyệt Minh Chứng"}
          displayButtonOk={false}
          displayButtonCancel={false}
          classNameChildren={"w-[800px]"}
        >
          <UploadProofStudent
            maHK={maHK}
            maSv={sinhVienItem.maSv}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            handleChangeFile={handleChangeFile}
            setHandleChangeFile={setHandleChangeFile}
            chooseFiles={chooseFiles}
            setChooseFiles={setChooseFiles}
            handleUpload={handleUpload}
          />
        </Modal>
      )}
    </Box>
  );
};

export default DanhSachDRLSinhVien;
