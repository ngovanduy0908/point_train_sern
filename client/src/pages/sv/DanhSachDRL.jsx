import { Box, IconButton, Tooltip } from "@mui/material";
import Header from "components/Header";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getListPointByMaSv } from "utils/getMany/getListPointByMaSv";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MaterialReactTable from "material-react-table";
import PhieuDRL from "./PhieuDRL";
import ModalV2 from "components/modal/ModalV2";
const DanhSachDRL = () => {
  const { currentUser } = useContext(AuthContext);
  //   console.log("curent user logging: ", currentUser);
  const [listPoint, setListPoint] = useState([]);
  const [hkItem, setHKItem] = useState();
  const [openPhieuDRL, setOpenPhieuDRL] = useState(false);
  const fetchData = async () => {
    const res = await getListPointByMaSv(`maSv=${currentUser.maSv}`);
    const newData = res.map((item, idx) => ({
      STT: idx + 1,
      ...item,
    }));
    setListPoint(newData);
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
        accessorKey: "name",
        header: "Học Kì",
        size: 140,
      },
      {
        accessorKey: "point_student",
        header: "Điểm SV Tự Đánh Giá",
        size: 140,
      },
      {
        accessorKey: "point_monitor",
        header: "Điểm LT Đánh Giá",
        size: 50,
      },
      {
        accessorKey: "point_teacher",
        header: "Điểm Khoa Đánh Giá",
        size: 50,
      },

      {
        accessorKey: "action",
        header: "Thao tác",
        size: 140,
        Cell: ({ cell, row }) => {
          // console.log("row trong thao tacs: ", row.original);

          return (
            <Box>
              <Tooltip title="Xem chi tiết">
                <IconButton
                  onClick={() => {
                    setOpenPhieuDRL(true);
                    setHKItem(row.original);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [listPoint]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Danh Sách Điểm Rèn Luyện"
        subtitle={`${currentUser.name}-${currentUser.maLop}`}
      />
      <Box mt="10px">
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
          data={listPoint}
          editingMode="modal"
          enableColumnOrdering
        />
      </Box>
      <ModalV2
        open={openPhieuDRL}
        setOpen={setOpenPhieuDRL}
        title={`Chi tiết điểm rèn luyện ${hkItem?.name}`}
        // changeHeight={true}
        displayButtonOk={false}
      >
        <PhieuDRL hkItem={hkItem} />
      </ModalV2>
    </Box>
  );
};

export default DanhSachDRL;
