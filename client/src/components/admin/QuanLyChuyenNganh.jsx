import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../Header";
import MaterialReactTable from "material-react-table";
import "./admin.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import axios from "axios";
import { toast } from "react-toastify";
import { getListDepartment, getListMajor } from "utils/getMany/getListMajor";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const QuanLyChuyenNganh = () => {
  // const theme = useTheme();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [listKhoa, setListKhoa] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const [err, setErr] = useState(null);
  //   const getAllMajor = async () => {
  //     try {
  //       const allKhoa = await getListDepartment();
  //       // console.log("vao day: ", allKhoa);
  //       setListKhoa(allKhoa);
  //       const allDepartment = await getListMajor();
  //       setTableData(allDepartment);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };

  const getAllMajor = async () => {
    try {
      // Sử dụng Promise.all để gọi cả hai hàm bất đồng bộ cùng một lúc
      const [allKhoa, allDepartment] = await Promise.all([
        getListDepartment(),
        getListMajor(),
      ]);

      // setListKhoa và setTableData sau khi cả hai hàm hoàn thành
      setListKhoa(allKhoa);
      setTableData(allDepartment);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getAllMajor();
  }, []);

  const handleCreateNewRow = async (values) => {
    try {
      await axios.post("http://localhost:8800/api/major", values, {
        withCredentials: true,
      });
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm chuyên ngành thành công");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //   console.log("row: ", row);
      //   console.log("values: ", values);
      axios.put(`${DOMAIN}/major/${row.original.maCN}`, values, {
        withCredentials: true,
      });
      setTableData([...tableData]);
      exitEditingMode();
      toast.success("Sửa thông tin thành công.");
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Bạn có chắc muốn xóa ${row.getValue("tenCN")}`)) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(`${DOMAIN}/major/${row.original.maCN}`, {
        withCredentials: true,
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      toast.success("Xóa thành công.");
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );
  const handleChangeGiaoVien = async (e, cnItem) => {
    if (!window.confirm(`Bạn có muốn thay đổi khoa của chuyên ngành không?`)) {
      return;
    }
    try {
      const values = {
        maCN: cnItem.maCN,
        tenCN: cnItem.tenCN,
        maKhoa: e.target.value,
      };
      await axios
        .put(`${DOMAIN}/major/${cnItem.maCN}`, values, {
          withCredentials: true,
        })
        .then(() => {
          getAllMajor();
          toast.success("Thay đổi thông tin thành công");
        });
      // window.location.href = "http://localhost:3000/quanlylophoc";
    } catch (error) {
      console.log(error);
    }
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "maCN",
        header: "Mã Chuyên Ngành",
        enableColumnOrdering: false,
        enableEditing: true, //disable editing on this column
        enableSorting: false,
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "tenCN",
        header: "Tên Chuyên Ngành",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "maKhoa",
        header: "Tên Khoa",
        size: 140,
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={row.original.maKhoa}
              onChange={(e) => handleChangeGiaoVien(e, row.original)}
            >
              {listKhoa.map((item) => (
                <MenuItem key={item.maKhoa} value={item.maKhoa}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ),
      },
    ],
    [getCommonEditTextFieldProps, listKhoa]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="KHOA" subtitle="Danh Sách Khoa" />
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
          editingMode="modal"
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Sửa thông tin">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Xóa khoa">
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
          listKhoa={listKhoa}
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
  listKhoa,
}) => {
  const [initValues, setInitValues] = useState({
    maCN: "",
    tenCN: "",
    maKhoa: "",
  });

  const handleSubmit = () => {
    //put your validation logic here
    const isAnyFieldEmpty = Object.values(initValues).some(
      (value) => value === ""
    );
    if (isAnyFieldEmpty) {
      // Hiển thị thông báo hoặc thực hiện logic nếu có trường bị trống
      return toast.warn("Vui lòng điền hết các trường");
    }
    console.log("maCN: ", initValues);
    onSubmit(initValues);
    onClose();
  };
  const handleChange = (e) => {
    setInitValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
              label="Mã Chuyên Ngành"
              name="maCN"
              onChange={handleChange}
            />

            <TextField
              label="Tên Chuyên Ngành"
              name="tenCN"
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chọn Khoa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={initValues.maKhoa}
                label="Chọn Khoa"
                name="maKhoa"
                onChange={handleChange}
              >
                {listKhoa.map((item) => (
                  <MenuItem key={item.maKhoa} value={item.maKhoa}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
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

export default QuanLyChuyenNganh;
