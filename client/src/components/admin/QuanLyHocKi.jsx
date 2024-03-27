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
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import axios from "axios";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const QuanLyHocKi = () => {
  // const theme = useTheme();
  // const status=[0, 1];
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);

  const getAllDepartment = async () => {
    try {
      const allDepartment = await axios.get(
        "http://localhost:8800/api/semesters",
        {
          withCredentials: true,
        }
      );
      setTableData(allDepartment.data);
      console.log("call lại cái");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAllDepartment();
  }, []);

  const handleCreateNewRow = async (values) => {
    try {
      await axios.post("http://localhost:8800/api/semesters", values, {
        withCredentials: true,
      });
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm học kì thành công");
    } catch (error) {
      // setErr(error.response.data);
      toast.error(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log("vap day: ", validationErrors);
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;

      axios.put(`${DOMAIN}/semesters/${row.original.maHK}`, values, {
        withCredentials: true,
      });

      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
      toast.success("Sửa học kì thành công");
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Bạn có chắc muốn xóa${row.getValue("name")}`)) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(
        `http://localhost:8800/api/semesters/${row.original.maHK}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      toast.success("Xóa học kì thành công");
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
              [cell.id]: `${cell.column.columnDef.header} không được để trống`,
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

  // const [value, setValue] = useState(0);
  const handleChange = async (value) => {
    try {
      // console.log("value status: ", value.status);
      if (!window.confirm(`Bạn có muốn thay đổi trạng thái học kì không?`)) {
        return;
      }
      const status = value.status;
      const data = {
        status: status === 0 ? 1 : 0,
      };
      // console.log("data nguoc: ", data);
      await axios
        .put(`${DOMAIN}/semesters/status/${value.maHK}`, data, {
          withCredentials: true,
        })
        .then(() => {
          getAllDepartment();
          toast.success("Cập nhật học kì thành công");
        });
    } catch (error) {
      console.log(error);
    }

    //required to exit editing mode and close modal
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "maHK",
        header: "Mã Học Kì",
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "name",
        header: "Tên Học Kì",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "status",
        header: "Trạng Thái",
        enableEditing: false,
        Cell: ({ cell, row }) => {
          // console.log("cell what: ", cell);
          return (
            <Button
              sx={{
                backgroundColor: "#ffe3a3",
                color: "#aa8b8b",
              }}
              onClick={() => handleChange(row.original)}
            >
              {row.original.status === 0 ? "Đóng" : "Mở"}
            </Button>
          );
        },
      },

      {
        accessorKey: "semester",
        header: "Kì",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "year",
        header: "Năm",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps, tableData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Học Kì" subtitle="Danh Sách Học Kì" />
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
              <Tooltip arrow placement="left" title="Sửa học kì">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Xóa học kì">
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
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    // console.log("alo: ", values);
    // const isAnyFieldEmpty = Object.values(values).some((value) => value === "");
    // if (isAnyFieldEmpty) {
    //   // Hiển thị thông báo hoặc thực hiện logic nếu có trường bị trống
    //   return toast.warn("Vui lòng điền hết các trường");
    // }
    onSubmit(values);
    onClose();
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
            {columns.map(
              (column) =>
                column.accessorKey !== "status" && (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    required
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                )
            )}
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

export default QuanLyHocKi;
