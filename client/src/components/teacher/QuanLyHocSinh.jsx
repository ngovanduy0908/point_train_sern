import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../Header";
import MaterialReactTable from "material-react-table";
import "../admin/admin.css";
import { getUserInLocalStorage } from "../../context/getCurrentUser.js";
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
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const QuanLyHocSinh = () => {
  const { pathname } = useLocation();
  const maLop = pathname.split("/")[2];
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createUploadFileStudent, setCreateUploadFileStudent] = useState(false);
  const [createUploadPointStudent, setCreateUploadPointStudent] =
    useState(false);

  const [createUploadPointMediumStudent, setCreateUploadPointMediumStudent] =
    useState(false);

  const [tableData, setTableData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);

  const currentUser = getUserInLocalStorage();

  // get all class
  useEffect(() => {
    getAllClass();
    getSemester();
  }, []);
  const getAllClass = async () => {
    try {
      const allClass = await axios.get(
        `http://localhost:8800/api/students/get-student/${maLop}`,
        {
          withCredentials: true,
        }
      );
      setTableData(allClass.data.table1);
      setClassData(allClass.data.table2);
      setRoleData(allClass.data.table3);
      // console.log(tableData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getSemester = async () => {
    try {
      const allClass = await axios.get(`http://localhost:8800/api/semesters`, {
        withCredentials: true,
      });
      setSemesterData(allClass.data);

      // console.log(tableData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // console.log(semesterData);
  // console.log(tableData);
  const handleCreateNewRow = async (values) => {
    // console.log(values);
    // console.log(maLop);

    try {
      await axios.post(`http://localhost:8800/api/students/${maLop}`, values, {
        withCredentials: true,
      });
      tableData.push(values);
      setTableData([...tableData]);
      window.location.href = `http://localhost:3000/quanlylopchunhiem/${maLop}`;
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      // console.log(values);
      axios.put(
        `http://localhost:8800/api/students/change-student/${row.original.maSv}`,
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
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }
      // console.log(row);
      //send api delete request here, then refetch or update local table data for re-render
      await axios.delete(
        `http://localhost:8800/api/students/${row.original.maSv}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const handleChangeChucVu = (e, maSv) => {
    if (!window.confirm(`Are you sure you want to change Chuc Vu`)) {
      return;
    }
    try {
      axios.put(
        `http://localhost:8800/api/students/change-role/${maSv}/${e.target.value}`,
        maLop,
        {
          withCredentials: true,
        }
      );
      window.location.href = `http://localhost:3000/quanlylopchunhiem/${maLop}`;
      // getAllClass();
    } catch (error) {
      console.log(error);
    }
    // console.log(maSv);
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
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
        accessorKey: "maSv",
        header: "Mã Sinh Viên",
        enableColumnOrdering: false,
        // enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Họ Và Tên",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "role_id",
        header: "Chức Vụ",
        size: 140,
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={row.original.role_id}
              onChange={(e) => handleChangeChucVu(e, row.original.maSv)}
            >
              {roleData.map(
                (item) =>
                  item.id !== 1 &&
                  item.id !== 2 && (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </Box>
        ),
      },
    ],
    [getCommonEditTextFieldProps, roleData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={currentUser.name}
        subtitle={`Danh Sách Sinh Viên Lớp ${classData[0]?.class_name}`}
      />
      <Box mt="40px">
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
            <>
              <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Thêm Mới
              </Button>

              <Button
                color="secondary"
                onClick={() => setCreateUploadFileStudent(true)}
                variant="contained"
              >
                Upload file sinh vien
              </Button>

              <Button
                color="secondary"
                onClick={() => setCreateUploadPointStudent(true)}
                variant="contained"
              >
                Quan Ly Diem Tuan CDSV
              </Button>

              <Button
                color="secondary"
                onClick={() => setCreateUploadPointMediumStudent(true)}
                variant="contained"
              >
                Quan Ly Diem TBHK
              </Button>
            </>
          )}
        />

        <CreateNewAccountModal
          err={err}
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />

        <CreateUploadFileSV
          err={err}
          open={createUploadFileStudent}
          onClose={() => setCreateUploadFileStudent(false)}
          maLop={maLop}
        />

        <CreateChooseSemesterModel
          err={err}
          open={createUploadPointStudent}
          onClose={() => setCreateUploadPointStudent(false)}
          maLop={maLop}
          semesterData={semesterData}
        />

        <CreateChooseSemesterTwoModel
          err={err}
          open={createUploadPointMediumStudent}
          onClose={() => setCreateUploadPointMediumStudent(false)}
          maLop={maLop}
          semesterData={semesterData}
        />
      </Box>
    </Box>
  );
};

export const CreateNewAccountModal = ({ err, open, onClose, onSubmit }) => {
  const [values, setValues] = useState({
    maSv: "",
    name: "",
  });

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(values);

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
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField label="Ma SV" name="maSv" onChange={handleChange} />

            <TextField label="Ten SV" name="name" onChange={handleChange} />

            {/* <FormControl fullWidth>
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
            </FormControl> */}
          </Stack>
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
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

export const CreateUploadFileSV = ({ err, open, onClose, maLop }) => {
  const [file, setFile] = useState(null);

  // console.log(maLop);
  function handleFileUpload(event) {
    setFile(event.target.files[0]);
  }
  // console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    // console.log(formData);
    try {
      axios.post(
        `http://localhost:8800/api/excel/students/${maLop}`,
        formData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Upload file student</DialogTitle>
      <DialogContent>
        {/* <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
          </Stack>
        </form> */}
        <form onSubmit={handleSubmit}>
          <TextField type="file" onChange={handleFileUpload} />
          <Button type="submit">Upload</Button>
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {/* <Button color="secondary" onClick={handleSubmit} variant="contained">
          Thêm Mới
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export const CreateChooseSemesterModel = ({
  err,
  open,
  onClose,
  maLop,
  semesterData,
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleChange = async (e) => {
    setValue(e.target.value);
    // console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/quanlylopchunhiem/uploadfilecdsv/${maLop}/${value}`);
    // console.log(formData);
    // try {
    //   axios.post(`http://localhost:8800/api/excel/students/${maLop}`, value, {
    //     withCredentials: true,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Chon Hoc Ki Upload Diem CDSV</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
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
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Chon
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const CreateChooseSemesterTwoModel = ({
  err,
  open,
  onClose,
  maLop,
  semesterData,
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleChange = async (e) => {
    setValue(e.target.value);
    // console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/quanlylopchunhiem/uploadfiletbhk/${maLop}/${value}`);
    // console.log(formData);
    // try {
    //   axios.post(`http://localhost:8800/api/excel/students/${maLop}`, value, {
    //     withCredentials: true,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Chon Hoc Ki Upload Diem TBHK</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
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
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Chon
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

export default QuanLyHocSinh;
