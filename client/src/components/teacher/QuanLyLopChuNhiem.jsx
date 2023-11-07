import React, { useEffect, useMemo, useState } from "react";
import Header from "../Header";
import MaterialReactTable from "material-react-table";
import "../admin/admin.css";
import { Box, IconButton } from "@mui/material";

import axios from "axios";
import { getUserInLocalStorage } from "context/getCurrentUser";
import ForwardIcon from "@mui/icons-material/Forward";
import { useNavigate } from "react-router-dom";
const QuanLyLopChuNhiem = () => {
  // const theme = useTheme();
  const currentUser = getUserInLocalStorage();

  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllDeadline();
  }, []);
  // useEffect(() => {
  const getAllDeadline = async () => {
    try {
      const allDeadline = await axios.get(
        `http://localhost:8800/api/students/${currentUser.maGv}`,
        {
          withCredentials: true,
        }
      );
      setTableData(allDeadline.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  // }, []);

  // console.log(tableData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "maLop",
        header: "Mã Lớp",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "class_name",
        header: "Tên Lớp",
        size: 140,
      },
      {
        accessorKey: "name_course",
        header: "Tên Khóa Học",
        size: 140,
      },
      {
        accessorKey: "siso",
        header: "Tổng Số Sinh Viên",
        size: 140,
      },
    ],
    []
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={currentUser.name} subtitle="Danh Sách Lớp Chủ Nhiệm" />
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
          data={tableData}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          renderRowActions={({ row, table }) => (
            <Box
              sx={{ display: "flex", gap: "1rem" }}
              onClick={() =>
                navigate(`/quanlylopchunhiem/${row.original.maLop}`)
              }
            >
              <IconButton
              // onClick={() => table.setEditingRow(row)}
              // onClick={handleClickOpen}
              >
                <ForwardIcon />
              </IconButton>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

export default QuanLyLopChuNhiem;
