import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../Header';
import MaterialReactTable from 'material-react-table';
import '../admin/admin.css';
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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import axios from 'axios';
import { getUserInLocalStorage } from 'context/getCurrentUser';
import FormDialog from './Dialog';

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
  // useEffect(() => {
  const getAllDeadline = async () => {
    try {
      const allDeadline = await axios.get(
        `http://localhost:8800/api/deadlines/${currentUser.maGv}`,
        {
          withCredentials: true,
        }
      );
      setTableData(allDeadline.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  // }, []);

  // console.log(tableData);
  const handleCreateNewRow = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(
        `http://localhost:8800/api/deadlines/${currentUser.maGv}`,
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
      console.log(values);
      // const maKhoa = row.original.maKhoa;
      // console.log(maKhoa);
      axios.put(
        `http://localhost:8800/api/departments/${values.maKhoa}`,
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
      console.log(row);
      if (!window.confirm(`Are you sure you want to delete deadline`)) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(
        `http://localhost:8800/api/deadlines/${currentUser.maGv}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData, currentUser.maGv]
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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'start_time_student',
        header: 'Thoi Gian Sinh Vien Bat Dau Cham',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'end_time_student',
        header: 'Thoi Gian Sinh Vien Ket Thuc Cham',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'end_time_monitor',
        header: 'Thoi Gian Lop Truong Ket Thuc Cham',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={currentUser.name} subtitle="Thoi Gian Cham, Duyet Diem" />
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
            <Box
              sx={{ display: 'flex', gap: '1rem' }}
              onClick={() => console.log(row)}
            >
              <Tooltip arrow placement="left" title="Edit">
                <IconButton
                  // onClick={() => table.setEditingRow(row)}
                  onClick={handleClickOpen}
                >
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

export default QuanLyThoiGian;
