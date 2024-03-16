import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { editDeadlinePoint } from "utils/put/editDeadlinePoint";

export default function FormDialog({
  open,
  handleClose,
  data,
  setOpen,
  fetchData,
}) {
  // console.log("data deadline: ", data);
  const {
    start_time_student_point,
    end_time_student_point,
    end_time_monitor_point,
  } = data;
  const [startTimeStudent, setStartTimeStudent] = useState(
    start_time_student_point || ""
  );
  const [endTimeStudent, setEndTimeStudent] = useState(
    end_time_student_point || ""
  );
  const [endTimeMonitor, setEndTimeMonitor] = useState(
    end_time_monitor_point || ""
  );
  const handleSubmit = async () => {
    try {
      const values = {
        start_time_student_point: startTimeStudent,
        end_time_student_point: endTimeStudent,
        end_time_monitor_point: endTimeMonitor,
      };
      const start_time_student_ss = new Date(startTimeStudent);
      const end_time_student_ss = new Date(endTimeStudent);
      const end_time_monitor_ss = new Date(endTimeMonitor);

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
      // console.log("vao day: ", values);
      await editDeadlinePoint(values);

      fetchData();
      setOpen(false);
      toast.success("Sửa thời gian thành công");
    } catch (error) {
      console.log(error.message);
    }

    // console.log(values);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {start_time_student_point
            ? "Cập nhật thời gian"
            : "Thêm mới thời gian"}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              width: "460px",
            }}
          >
            <TextField
              name="start_time_student"
              value={startTimeStudent}
              onChange={(e) => setStartTimeStudent(e.target.value)}
              label="Thời Gian Sinh Viên Bắt Đầu Chấm"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
              required
            />
            <TextField
              name="end_time_student"
              value={endTimeStudent}
              onChange={(e) => setEndTimeStudent(e.target.value)}
              label="Thời Gian Sinh Viên Kết Thúc Chấm"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
              required
            />
            <TextField
              name="end_time_monitor"
              value={endTimeMonitor}
              onChange={(e) => setEndTimeMonitor(e.target.value)}
              label="Thời Gian Lớp Trưởng Duyệt"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Thoát
          </Button>
          <Button
            color="primary"
            onClick={() => handleSubmit()}
            variant="contained"
          >
            {start_time_student_point ? "Lưu" : "Tạo"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
