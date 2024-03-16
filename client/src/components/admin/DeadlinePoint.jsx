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

import { getUserInLocalStorage } from "context/getCurrentUser";
import { toast } from "react-toastify";
import { formatDay } from "utils/function/formatDay";
import { getAllDeadlinePoint } from "utils/getMany/getDeadlinePoint";
import FormDialog from "./Dialog";
import { insertDeadlinePoint } from "utils/postDetails/insertDeadlinePoint";
import { deleteDeadlinePoint } from "utils/remove/removeDeadlinePoint";
const DeadlinePoint = () => {
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
      const allDeadline = await getAllDeadlinePoint();
      setTableData(allDeadline);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      // console.log("value ne: ", values);
      await insertDeadlinePoint(values);
      getAllDeadline();
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm thời gian thành công");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {};

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      // console.log(row);
      if (!window.confirm(`Bạn có chắc muốn xóa thời gian không?`)) {
        return;
      }

      await deleteDeadlinePoint();
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "start_time_student_point",
        header: "Sinh Viên Bắt Đầu Chấm",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        Cell: ({ cell, row }) => {
          return (
            <div>{formatDay(row?.original?.start_time_student_point)}</div>
          );
        },
      },
      {
        accessorKey: "end_time_student_point",
        header: "Sinh Viên Kết Thúc Chấm",
        size: 140,
        Cell: ({ cell, row }) => {
          return <div>{formatDay(row?.original?.end_time_student_point)}</div>;
        },
      },
      {
        accessorKey: "end_time_monitor_point",
        header: "Lớp Trưởng Kết Thúc Duyệt",
        size: 140,
        Cell: ({ cell, row }) => {
          return <div>{formatDay(row?.original?.end_time_monitor_point)}</div>;
        },
      },
    ],
    [tableData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={currentUser.name} subtitle="Thời Gian Chấm, Duyệt Điểm" />
      <Box mt="40px">
        {tableData.length > 0 ? (
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
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        ) : (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Thêm Mới
          </Button>
        )}

        <CreateNewAccountModal
          err={err}
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />

        {open && (
          <FormDialog
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
    const start_time_student_ss = new Date(values?.start_time_student_point);
    const end_time_student_ss = new Date(values?.end_time_student_point);
    const end_time_monitor_ss = new Date(values?.end_time_monitor_point);

    if (end_time_student_ss <= start_time_student_ss) {
      return toast.warn(
        "Thời gian kết thúc chấm điểm phải lớn hơn thời gian bắt đầu chấm điểm"
      );
    }

    if (end_time_monitor_ss <= end_time_student_ss) {
      return toast.warn(
        "Thời gian duyệt của lớp trưởng phải lớn hơn thời gian kết thúc của sinh viên"
      );
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

export default DeadlinePoint;
