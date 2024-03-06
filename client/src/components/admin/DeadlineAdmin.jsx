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
import Header from "components/Header";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { formatDay } from "utils/function/formatDay";
import { getDeadlineAdmin } from "utils/getMany/getDealineAdmin";
import { insertDeadlineAdmin } from "utils/postDetails/insertDeadlineAdmin";
import ModalEditDeadlineAdmin from "./ModalEditDeadlineAdmin";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const DeadlineAdmin = ({ maHK }) => {
  const [tableData, setTableData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    // setFormData(tableData)
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const fetchData = async () => {
    try {
      const res = await getDeadlineAdmin(`${maHK}`);
      // console.log("res: ", res);
      setTableData(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateNewRow = async (values) => {
    try {
      await insertDeadlineAdmin(`${maHK}`, values);
      // await axios.post(`${DOMAIN}/deadlines/${currentUser.maGv}`, values, {
      //   withCredentials: true,
      // });
      fetchData();
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm thời gian thành công");
    } catch (error) {
      toast.warn(error.response.data);
    }
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
      await axios.delete(`${DOMAIN}/deadlines_admin/${maHK}`, {
        withCredentials: true,
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
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
      // {
      //   accessorKey: "end_time_monitor",
      //   header: "Lớp Trưởng Kết Thúc Duyệt",
      //   size: 140,
      //   Cell: ({ cell, row }) => {
      //     return <div>{formatDay(row?.original?.end_time_monitor)}</div>;
      //   },
      // },
    ],
    [tableData]
  );
  return (
    <div>
      {tableData.length ? (
        <>
          <Header subtitle={maHK} />
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
            // onEditingRowSave={handleSaveRowEdits}
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
        </>
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
        err={""}
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />

      {open && (
        <ModalEditDeadlineAdmin
          // currentUser={currentUser}
          open={open}
          handleClose={handleClose}
          data={tableData[0]}
          setOpen={setOpen}
          fetchData={fetchData}
        />
      )}
    </div>
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
    // console.log("value ne: ", values);
    // const valuesCheck = {
    //   start_time_student: startTimeStudent,
    //   end_time_student: endTimeStudent,
    //   end_time_monitor: endTimeMonitor,
    // };
    const start_time_student_ss = new Date(values.start_time_student);
    const end_time_student_ss = new Date(values.end_time_student);

    if (end_time_student_ss <= start_time_student_ss) {
      return toast.warn(
        "Thời gian kết thúc chấm điểm phải lớn hơn thời gian bắt đầu chấm điểm"
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
export default DeadlineAdmin;
