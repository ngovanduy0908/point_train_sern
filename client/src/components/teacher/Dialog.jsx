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

export default function FormDialog({
  open,
  handleClose,
  data,
  currentUser,
  setOpen,
  fetchData,
}) {
  const { start_time_student, end_time_student, end_time_monitor } = data;
  const [startTimeStudent, setStartTimeStudent] = useState(
    start_time_student || ""
  );
  const [endTimeStudent, setEndTimeStudent] = useState(end_time_student || "");
  const [endTimeMonitor, setEndTimeMonitor] = useState(end_time_monitor || "");
  const handleSubmit = async () => {
    try {
      const values = {
        start_time_student: startTimeStudent,
        end_time_student: endTimeStudent,
        end_time_monitor: endTimeMonitor,
      };
      await axios.put(
        `http://localhost:8800/api/deadlines/${currentUser.maGv}`,
        values,
        {
          withCredentials: true,
        }
      );
      fetchData();
      setOpen(false);
      // toast.success('')
      // window.location.href = "http://localhost:3000/quanlythoigian";
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
          {start_time_student ? "Cập nhật thời gian" : "Thêm mới thời gian"}
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
            {start_time_student ? "Lưu" : "Tạo"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
