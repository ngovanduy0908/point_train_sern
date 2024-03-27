import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../Header";
import MaterialReactTable from "material-react-table";
import "../admin/admin.css";
import { getUserInLocalStorage } from "../../context/getCurrentUser.js";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import axios from "axios";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const QuanLyGiaoVien = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);

  const currentUser = getUserInLocalStorage();

  const getAllDepartment = async () => {
    try {
      const allDepartment = await axios.get(
        `${DOMAIN}/teachers/${currentUser.maKhoa}`,
        {
          withCredentials: true,
        }
      );
      setTableData(allDepartment.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAllDepartment();
  }, []);

  // console.log(tableData);
  const handleCreateNewRow = async (values) => {
    // console.log(values);
    try {
      await axios.post(`${DOMAIN}/teachers/${currentUser.maKhoa}`, values, {
        withCredentials: true,
      });
      getAllDepartment();
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm giáo viên thành công");
      setCreateModalOpen(false);
    } catch (error) {
      // setErr(error.response.data);
      toast.error(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    try {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        await axios.put(
          `http://localhost:8800/api/teachers/${currentUser.maKhoa}/${row.original.maGv}`,
          values,
          {
            withCredentials: true,
          }
        );
        //send/receive api updates here, then refetch or update local table data for re-render
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
        toast.success("Sửa giáo viên thành công");
      }
    } catch (error) {
      toast.error("Mã giáo viên đã tồn tại");
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Bạn có muốn xóa ${row.getValue("name")}`)) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(
        `${DOMAIN}/teachers/${currentUser.maKhoa}/${row.original.maGv}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      toast.success("Xóa giáo viên thành công");
    },
    [tableData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "maGv",
        header: "Mã Giáo Viên",
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Tên Giáo Viên",
        size: 140,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 140,
      },
      {
        accessorKey: "password",
        header: "Mật Khẩu",
      },

      {
        accessorKey: "phone_number",
        header: "Số Điện Thoại",
      },
    ],
    [tableData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={currentUser.name}
        subtitle={`Danh sách giáo viên khoa ${currentUser.name}`}
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
          data={tableData}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Sửa thông tin giáo viên">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Xóa giáo viên">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Thêm Mới
            </Button>
          )}
        />

        <CreateNewAccountModal
          err={err}
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </Box>
    </Box>
  );
};

export const CreateNewAccountModal = ({
  err,
  open,
  columns,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = useState({
    maGv: "",
    name: "",
  });

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // console.log(values);
  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Thêm Mới</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField
              label="Mã Giáo Viên"
              name="maGv"
              onChange={handleChange}
            />
            <TextField
              label="Tên Giáo Viên"
              name="name"
              onChange={handleChange}
            />
          </Stack>
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose} color="secondary">
          Thoát
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Thêm Mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default QuanLyGiaoVien;
