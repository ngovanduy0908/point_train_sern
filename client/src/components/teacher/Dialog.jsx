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

export default function FormDialog({ open, handleClose, data, currentUser }) {
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
      window.location.href = "http://localhost:3000/quanlythoigian";
    } catch (error) {
      console.log(error.message);
    }

    // console.log(values);
  };
  return (
    <div
      style={{
        width: "35%",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {start_time_student ? "Update deadline" : "Create new deadline"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              name="start_time_student"
              value={startTimeStudent}
              onChange={(e) => setStartTimeStudent(e.target.value)}
              label="Thoi Gian Sinh Vien Bat Dau Cham"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
            />
            <TextField
              name="end_time_student"
              value={endTimeStudent}
              onChange={(e) => setEndTimeStudent(e.target.value)}
              label="Thoi Gian Sinh Vien Ket Thuc Cham"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
            />
            <TextField
              name="end_time_monitor"
              value={endTimeMonitor}
              onChange={(e) => setEndTimeMonitor(e.target.value)}
              label="Thoi Gian Lop Truong Duyet"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleSubmit()}
            variant="contained"
          >
            {start_time_student ? "Luu" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
