import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../Header";
import MaterialReactTable from "material-react-table";
import "../admin/admin.css";
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
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import axios from "axios";
import { getUserInLocalStorage } from "context/getCurrentUser";
import FormDialog from "./Dialog";
import { toast } from "react-toastify";
import { formatDay } from "utils/function/formatDay";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const QuanLyThoiGian = () => {
  // const theme = useTheme();
  const currentUser = getUserInLocalStorage();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setFormData(tableData)
  };
  useEffect(() => {
    getAllDeadline();
  }, []);

  const getAllDeadline = async () => {
    try {
      const allDeadline = await axios.get(
        `${DOMAIN}/deadlines/${currentUser.maGv}`,
        {
          withCredentials: true,
        }
      );
      setTableData(allDeadline.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      console.log("value ne: ", values);
      await axios.post(`${DOMAIN}/deadlines/${currentUser.maGv}`, values, {
        withCredentials: true,
      });
      getAllDeadline();
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm thời gian thành công");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    // if (!Object.keys(validationErrors).length) {
    //   tableData[row.index] = values;
    //   await axios.put(`${DOMAIN}/departments/${values.maKhoa}`, values, {
    //     withCredentials: true,
    //   });
    //   console.log("values: ");
    //   setTableData([...tableData]);
    //   exitEditingMode(); //required to exit editing mode and close modal
    //   toast.success("Sửa thời gian thành công");
    // }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      // console.log(row);
      if (!window.confirm(`Bạn có chắc muốn xóa thời gian không?`)) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(`${DOMAIN}/deadlines/${currentUser.maGv}`, {
        withCredentials: true,
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData, currentUser.maGv]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "start_time_student",
        header: "Sinh Viên Bắt Đầu Chấm",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        Cell: ({ cell, row }) => {
          return <div>{formatDay(row?.original?.start_time_student)}</div>;
        },
      },
      {
        accessorKey: "end_time_student",
        header: "Sinh Viên Kết Thúc Chấm",
        size: 140,
        Cell: ({ cell, row }) => {
          return <div>{formatDay(row?.original?.end_time_student)}</div>;
        },
      },
      {
        accessorKey: "end_time_monitor",
        header: "Lớp Trưởng Kết Thúc Duyệt",
        size: 140,
        Cell: ({ cell, row }) => {
          return <div>{formatDay(row?.original?.end_time_monitor)}</div>;
        },
      },
    ],
    [tableData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={currentUser.name} subtitle="Thời Gian Chấm, Duyệt Điểm" />
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
              <Tooltip arrow placement="left" title="Sửa Thời Gian">
                <IconButton onClick={handleClickOpen}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Xóa Thời Gian">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() =>
            tableData.length > 0 ? (
              <ChangeCircleIcon />
            ) : (
              <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Thêm Mới
              </Button>
            )
          }
        />

        <CreateNewAccountModal
          err={err}
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />

        {open && (
          <FormDialog
            currentUser={currentUser}
            open={open}
            handleClose={handleClose}
            data={tableData[0]}
            setOpen={setOpen}
            fetchData={getAllDeadline}
          />
        )}
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
    const isAnyFieldEmpty = Object.values(values).some((value) => value === "");
    if (isAnyFieldEmpty) {
      // Hiển thị thông báo hoặc thực hiện logic nếu có trường bị trống
      return toast.warn("Vui lòng điền hết các trường");
    }
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
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                type="date"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ))}
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

export default QuanLyThoiGian;
