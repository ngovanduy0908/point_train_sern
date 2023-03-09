import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import axios from 'axios';
import Header from 'components/Header';
import { getUserInLocalStorage } from 'context/getCurrentUser';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PhieuChamDiem = () => {
  const currentUser = getUserInLocalStorage();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const maHK = searchParams.get('maHK');
  const [value, setValue] = useState(maHK || '');
  const [semesterData, setSemesterData] = useState([]);

  // console.log(maHK);
  const navigate = useNavigate();
  const handleChange = async (e) => {
    setValue(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = () => {
    navigate(`/chamdiemrenluyen/${value}`);
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
      <Box sx={{ display: 'flex', gap: '30px' }}>
        <Header
          title="Cham Diem Ren Luyen"
          subtitle="Vui Long Chon HK truoc khi Cham."
        />
      </Box>
      <Box mt="40px">
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ borderRadius: '20px', width: '40%', margin: 'auto' }}
        >
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
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
            sx={{ mt: '10px' }}
          >
            Chon
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PhieuChamDiem;
