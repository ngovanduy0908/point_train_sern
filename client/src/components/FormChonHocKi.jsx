import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import React, { useEffect, useState } from "react";

const FormChonHocKi = ({ onSubmit, value, setValue }) => {
  const [semesterData, setSemesterData] = useState([]);

  // console.log(maHK);
  const handleChange = async (e) => {
    setValue(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  useEffect(() => {
    getSemester();
  }, []);

  const getSemester = async () => {
    try {
      const allClass = await axios.get(
        `http://localhost:8800/api/semesters/get_semester_open`,
        {
          withCredentials: true,
        }
      );
      setSemesterData(allClass.data);

      // console.log(tableData);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Header
          title="Chọn Học Kì"
          subtitle="Vui Lòng Chọn Học Kì Trước Khi Thao Tác"
        />
      </Box>
      <Box mt="40px">
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ borderRadius: "20px", width: "40%", margin: "auto" }}
        >
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <FormControl fullWidth required={true}>
              <InputLabel id="demo-simple-select-label">Chon Hoc Ki</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Chon Hoc Ki"
                name="maHK"
                onChange={handleChange}
              >
                {semesterData.map((item) => (
                  <MenuItem key={item.maHK} value={item.maHK}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Button
            color="secondary"
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: "10px" }}
          >
            Chon
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default FormChonHocKi;
