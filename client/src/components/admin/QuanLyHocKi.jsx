import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../Header';
import MaterialReactTable from 'material-react-table';
import './admin.css';
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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import axios from 'axios';

const QuanLyHocKi = () => {
  // const theme = useTheme();
  // const status=[0, 1];
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);

  useEffect(() => {
    const getAllDepartment = async () => {
      try {
        const allDepartment = await axios.get(
          'http://localhost:8800/api/semesters',
          {
            withCredentials: true,
          }
        );
        setTableData(allDepartment.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getAllDepartment();
  }, []);

  // console.log(tableData);
  const handleCreateNewRow = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post(
        'http://localhost:8800/api/semesters',
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
      // console.log(row);
      // console.log(values);
      // const maKhoa = row.original.maKhoa;
      // console.log(maKhoa);
      axios.put(
        `http://localhost:8800/api/courses/${values.maKhoaHoc}`,
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
        `http://localhost:8800/api/semesters/${row.original.maHK}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
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

  // const [value, setValue] = useState(0);
  const handleChange = async (value) => {
    try {
      axios.put(
        `http://localhost:8800/api/semesters/${value.original.maHK}/${value.original.status}`,
        value.original,
        {
          withCredentials: true,
        }
      );
      window.location.href = 'http://localhost:3000/quanlyhocki';
    } catch (error) {
      console.log(error);
    }

    //required to exit editing mode and close modal
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'maHK',
        header: 'Mã Học Kì',
        enableColumnOrdering: false,
        // enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Ten',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: 'status',
      //   header: 'Trạng Thái',
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      {
        accessorKey: 'status',
        header: 'Trang Thai',
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Button
            sx={{
              backgroundColor: '#ffe3a3',
              color: '#aa8b8b',
            }}
            onClick={() => handleChange(row)}
          >
            {cell.getValue() === 0 ? 'Đóng' : 'Mở'}
          </Button>
        ),
      },

      {
        accessorKey: 'semester',
        header: 'Kì',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'year',
        header: 'Năm',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="KHOA" subtitle="Danh sách Khóa Học" />
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
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {})
  );

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
            {columns.map(
              (column) =>
                column.accessorKey !== 'status' && (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
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

export default QuanLyHocKi;
