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
  Grid,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "components/modal/Modal";
import XetDiemRenLuyenMonitor from "pages/gv/XetDiemRenLuyenMonitor";
import { toast } from "react-toastify";
import { downloadFile } from "utils/postDetails/handleDataExportExcelGV";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const url =
  "https://wxutuelmzidfloowaugx.supabase.co/storage/v1/object/public/files/excel/DS-class-template.xlsx?t=2024-02-05T16%3A29%3A19.996Z";
const QuanLyHocSinh = () => {
  const { maLop } = useParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createUploadFileStudent, setCreateUploadFileStudent] = useState(false);
  const [openFormChonHocKi, setOpenFormChonHocKi] = useState(false);
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

  const handleCreateNewRow = async (values) => {
    try {
      await axios.post(`${DOMAIN}/students/${maLop}`, values, {
        withCredentials: true,
      });
      getAllClass();
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm mới sinh viên thành công");
    } catch (error) {
      // setErr(error.response.data);
      toast.error("Thêm mới sinh viên thất bại");
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        tableData[row.index] = values;
        // console.log(values);
        await axios.put(
          `${DOMAIN}/students/change-student/${row.original.maSv}`,
          values,
          {
            withCredentials: true,
          }
        );
        //send/receive api updates here, then refetch or update local table data for re-render
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
        toast.success("Sửa thông tin thành công");
      } catch (error) {
        // console.log("tại sao: ", error);
        toast.error("Mã sinh viên này đã tồn tại.");
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Bạn có muốn xóa ${row.getValue("name")}`)) {
        return;
      }

      await axios.delete(`${DOMAIN}/students/${row.original.maSv}`, {
        withCredentials: true,
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const handleChangeChucVu = async (e, sinhVien) => {
    if (!window.confirm(`Bạn có muốn thay đổi chức vụ không?`)) {
      return;
    }
    try {
      // const maLop =
      const { maSv, maLop } = sinhVien;
      // console.log("sinh vien: ", sinhVien);
      await axios.put(
        `${DOMAIN}/students/change-role/${maSv}/${e.target.value}?maLop=${maLop}`,
        maLop,
        {
          withCredentials: true,
        }
      );
      getAllClass();
      toast.success("Thay đổi thành công");
    } catch (error) {
      toast.warn(error.response.data);
    }
  };

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
              onChange={(e) => handleChangeChucVu(e, row.original)}
              placeholder="Sinh Viên"
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
    [roleData, tableData]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={currentUser.name}
        subtitle={`Danh Sách Sinh Viên Lớp ${classData[0]?.class_name}`}
      />
      <Box>
        <Box sx={{ flexGrow: 1 }} mb="10px">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  width: "100%",
                }}
                onClick={() => setOpenFormChonHocKi(true)}
              >
                Xét Điểm Rèn Luyện
              </Button>
            </Grid>
          </Grid>
        </Box>
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
              <Tooltip arrow placement="left" title="Sửa thông tin">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Xóa sinh viên">
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
                Upload file danh sách SV
              </Button>

              <Button
                color="secondary"
                onClick={() => setCreateUploadPointStudent(true)}
                variant="contained"
              >
                Quản Lý Điểm Tuần CDSV
              </Button>

              <Button
                color="secondary"
                onClick={() => setCreateUploadPointMediumStudent(true)}
                variant="contained"
              >
                Quản Lý Điểm TBHK
              </Button>
            </>
          )}
        />

        <Modal
          open={openFormChonHocKi}
          setOpen={setOpenFormChonHocKi}
          displayButtonOk={false}
          displayButtonCancel={false}
        >
          <XetDiemRenLuyenMonitor maLop={maLop} />
        </Modal>

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
          getAllClass={getAllClass}
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
            <TextField
              label="Mã Sinh Viên"
              name="maSv"
              onChange={handleChange}
            />

            <TextField
              label="Tên Sinh Viên"
              name="name"
              onChange={handleChange}
            />
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

export const CreateUploadFileSV = ({
  err,
  open,
  onClose,
  maLop,
  getAllClass,
}) => {
  const [file, setFile] = useState(null);

  // console.log(maLop);
  function handleFileUpload(event) {
    // console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }
  // console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    // console.log(formData);
    try {
      await axios.post(`${DOMAIN}/excel/students/${maLop}`, formData, {
        withCredentials: true,
      });
      getAllClass();
      onClose();
      // console.log("value: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Upload Danh Sách Sinh Viên</DialogTitle>
      <DialogContent>
        <Button
          variant="text"
          color="secondary"
          onClick={() => downloadFile(url, "File template DS Lop.xlsx")}
        >
          Tải File Template
        </Button>
        <form onSubmit={handleSubmit}>
          <TextField type="file" onChange={handleFileUpload} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "15px",
            }}
          >
            Upload
          </Button>
        </form>
        {err && err}
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose} color="secondary">
          Thoát
        </Button>
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
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        Chọn HK Upload Điểm Tuần CDSV
      </DialogTitle>
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
              <InputLabel id="demo-simple-select-label">Chọn Học Kì</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Chọn Học Kì"
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
          Thoát
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Chọn
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
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Chọn HK Upload Điểm TBHK</DialogTitle>
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
              <InputLabel id="demo-simple-select-label">Chọn Học Kì</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Chọn Học Kì"
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
          Thoát
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Chọn
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuanLyHocSinh;
