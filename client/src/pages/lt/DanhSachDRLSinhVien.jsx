import { getUserInLocalStorage } from "context/getCurrentUser";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { getPointStudentByMaLopAndMaHK } from "utils/getDetails/getPointDanhSachLop";
import Header from "components/Header";
import Badge from "components/Badge";
import Modal from "components/modal/Modal";
import ModalV1 from "components/modal/ModalV1";
import DuyetDiemRenLuyenLT from "./DuyetDiemRenLuyenLT";
const DanhSachDRLSinhVien = () => {
  const currentUser = getUserInLocalStorage();
  const { maHK } = useParams();

  const [danhSachDiemSinhVien, setDanhSachDiemSinhVien] = useState([]);
  const [sinhVienItem, setSinhVienItem] = useState();
  const [openFormDRL, setOpenFormDRL] = useState(false);
  const [openFormMinhChung, setOpenFormMinhChung] = useState(false);
  const fetchData = async () => {
    const res = await getPointStudentByMaLopAndMaHK(
      `maHK=${maHK}&maLop=${currentUser.maLop}`
    );
    const newData = res.map((item, idx) => ({
      STT: idx + 1,
      ...item,
    }));
    setDanhSachDiemSinhVien(newData);
    console.log("res: ", res);
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
                <IconButton onClick={() => setOpenFormMinhChung(true)}>
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

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={currentUser?.name}
        subtitle={`Danh Sách Sinh Viên Lớp - ${currentUser?.maLop}`}
      />
      <Box mt="40px">
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
        />
      </ModalV1>

      <Modal
        open={openFormMinhChung}
        setOpen={setOpenFormMinhChung}
        title={"Minh chứng"}
      >
        Minh chứng của sinh viên
      </Modal>
    </Box>
  );
};

export default DanhSachDRLSinhVien;
