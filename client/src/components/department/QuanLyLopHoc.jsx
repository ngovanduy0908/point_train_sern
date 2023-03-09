import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../Header';
import MaterialReactTable from 'material-react-table';
import '../admin/admin.css';
import { getUserInLocalStorage } from '../../context/getCurrentUser.js';
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import axios from 'axios';

const QuanLyLopHoc = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);

  const currentUser = getUserInLocalStorage();

  // get all class
  useEffect(() => {
    const getAllClass = async () => {
      try {
        const allClass = await axios.get(
          `http://localhost:8800/api/class/${currentUser.maKhoa}`,
          {
            withCredentials: true,
          }
        );
        setTableData(allClass.data.table1);
        setCourseData(allClass.data.table2);
        setTeacherData(allClass.data.table3);
        // console.log(tableData);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getAllClass();
  }, [currentUser.maKhoa]);

  // console.log(tableData);
  const handleCreateNewRow = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post(
        `http://localhost:8800/api/class/${currentUser.maKhoa}`,
        values,
        {
          withCredentials: true,
        }
      );
      tableData.push(values);
      setTableData([...tableData]);
      console.log(res.data);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      // console.log(values);
      axios.put(
        `http://localhost:8800/api/class/${row.original.maLop}`,
        values,
        {
          withCredentials: true,
        }
      );
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue('name')}`
        )
      ) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(
        `http://localhost:8800/api/class/${currentUser.maKhoa}/${row.original.maLop}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData, currentUser.maKhoa]
  );

  const handleChangeGiaoVien = (e, maLop) => {
    if (!window.confirm(`Are you sure you want to change GV`)) {
      return;
    }
    try {
      axios.put(
        `http://localhost:8800/api/class/changeGV/${maLop}/${e.target.value}`,
        maLop,
        {
          withCredentials: true,
        }
      );
      window.location.href = 'http://localhost:3000/quanlylophoc';
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeKhoaHoc = (e, maLop) => {
    if (!window.confirm(`Are you sure you want to change GV`)) {
      return;
    }
    try {
      axios.put(
        `http://localhost:8800/api/class/changeKhoaHoc/${maLop}/${e.target.value}`,
        maLop,
        {
          withCredentials: true,
        }
      );
      window.location.href = 'http://localhost:3000/quanlylophoc';
    } catch (error) {
      console.log(error);
    }
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'maLop',
        header: 'Mã Lớp',
        enableColumnOrdering: false,
        // enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'class_name',
        header: 'Ten Lop',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'maGv',
        header: 'Ten Giao Vien',
        size: 140,
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={row.original.maGv}
              onChange={(e) => handleChangeGiaoVien(e, row.original.maLop)}
            >
              {teacherData.map((item) => (
                <MenuItem key={item.maGv} value={item.maGv}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ),
      },
      {
        accessorKey: 'maKhoaHoc',
        header: 'Ten Khóa',
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={row.original.maKhoaHoc}
              onChange={(e) => handleChangeKhoaHoc(e, row.original.maLop)}
            >
              {courseData.map((item) => (
                <MenuItem key={item.maKhoaHoc} value={item.maKhoaHoc}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ),
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
    ],
    [getCommonEditTextFieldProps, courseData, teacherData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={currentUser.name}
        subtitle={`Danh sách Lop Hoc Khoa ${currentUser.name}`}
      />
      <Box mt="40px">
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
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
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
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
          courseData={courseData}
          teacherData={teacherData}
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
  courseData,
  teacherData,
}) => {
  const [values, setValues] = useState({
    maLop: '',
    class_name: '',
    maGv: '',
    maKhoaHoc: '',
  });

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(values);

  // console.log(values);
  const handleSubmit = () => {
    //put your validation logic here
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
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <TextField label="Ma Lop" name="maLop" onChange={handleChange} />

            <TextField
              label="Ten Lop"
              name="class_name"
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Chon Giao Vien
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.maGv}
                label="Chon Giao Vien"
                name="maGv"
                onChange={handleChange}
              >
                {teacherData.map((item) => (
                  <MenuItem key={item.maGv} value={item.maGv}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Chon Khóa Học
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.maKhoaHoc}
                label="Chon Khoa Hoc"
                onChange={handleChange}
                name="maKhoaHoc"
              >
                {courseData.map((item) => (
                  <MenuItem key={item.maKhoaHoc} value={item.maKhoaHoc}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
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

export default QuanLyLopHoc;
