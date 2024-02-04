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
  InputLabel,
  FormControl,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import SelectV1 from "react-select";

import axios from "axios";
import { toast } from "react-toastify";
import { getListMajorByMaKhoa } from "utils/getMany/getListMajorByMaKhoa";
import { isCheckSomeFieldEmpty } from "utils/function/validateValue";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue" : "white",
    color: state.isSelected ? "white" : "black",
    cursor: "pointer",
    opacity: state.isFocused ? 0.8 : 1, // Opacity khi hover
    transition: "background-color 0.3s",
  }),
};
const QuanLyLopHoc = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [listMajor, setListMajor] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [err, setErr] = useState(null);

  const currentUser = getUserInLocalStorage();

  // get all class
  const getAllClass = async () => {
    try {
      const allClass = await axios.get(
        `${DOMAIN}/class/${currentUser.maKhoa}`,
        {
          withCredentials: true,
        }
      );
      const resMajor = await getListMajorByMaKhoa(`${currentUser.maKhoa}`);
      const formatMajor = resMajor.map((item) => ({
        label: item.tenCN,
        value: item.maCN,
      }));
      // console.log("res: ", resMajor);
      setTableData(allClass.data.table1);
      setCourseData(allClass.data.table2);
      setTeacherData(allClass.data.table3);
      setDataMajor(resMajor);
      setListMajor(formatMajor);
      // console.log("allClass.data.table1: ", allClass.data.table1);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAllClass();
  }, []);

  // console.log(tableData);
  const handleCreateNewRow = async (values) => {
    // console.log(values);
    try {
      await axios.post(`${DOMAIN}/class/${currentUser.maKhoa}`, values, {
        withCredentials: true,
      });
      getAllClass();
      tableData.push(values);
      setTableData([...tableData]);
      toast.success("Thêm lớp học thành công");
      // console.log(res.data);
    } catch (error) {
      // setErr(error.response.data);
      toast.error(error.response.data);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      // console.log(values);
      await axios.put(
        `http://localhost:8800/api/class/${row.original.maLop}`,
        values,
        {
          withCredentials: true,
        }
      );
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
      toast.success("Sửa lớp học thành công");
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Bạn có muốn xóa lớp học không ?`)) {
        return;
      }
      await axios.delete(
        `${DOMAIN}/class/${currentUser.maKhoa}/${row.original.maLop}`,
        {
          withCredentials: true,
        }
      );
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      toast.success("Xóa lớp học thành công?");
    },
    [tableData, currentUser.maKhoa]
  );

  const handleChangeGiaoVien = async (e, maLop) => {
    if (!window.confirm(`Bạn có muốn thay đổi giáo viên chủ nhiệm không?`)) {
      return;
    }
    try {
      await axios
        .put(`${DOMAIN}/class/changeGV/${maLop}/${e.target.value}`, maLop, {
          withCredentials: true,
        })
        .then(() => {
          getAllClass();
        });
      // window.location.href = "http://localhost:3000/quanlylophoc";
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeKhoaHoc = async (e, maLop) => {
    if (!window.confirm(`Bạn có muốn thay đổi khóa học không?`)) {
      return;
    }
    try {
      await axios
        .put(
          `${DOMAIN}/class/changeKhoaHoc/${maLop}/${e.target.value}`,
          maLop,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          getAllClass();
        });
      // window.location.href = "http://localhost:3000/quanlylophoc";
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeChuyenNganh = async (e, row) => {
    console.log("e: ", e.target);
    console.log("row: ", row);
    if (!window.confirm(`Bạn có muốn thay đổi chuyên ngành không?`)) {
      return;
    }
    try {
      const values = {
        ...row,
        maCN: e.target.value,
      };
      await axios
        .put(`${DOMAIN}/class/${row.maLop}`, values, {
          withCredentials: true,
        })
        .then(() => {
          getAllClass();
        });
      // window.location.href = "http://localhost:3000/quanlylophoc";
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "maLop",
        header: "Mã Lớp",
        enableColumnOrdering: false,
        // enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "class_name",
        header: "Tên Lớp",
        size: 140,
      },
      {
        accessorKey: "maGv",
        header: "Tên Giáo Viên",
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
        accessorKey: "maKhoaHoc",
        header: "Tên Khóa Học",
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
      },
      {
        accessorKey: "maCN",
        header: "Tên Chuyên Ngành",
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={row.original.maCN}
              onChange={(e) => handleChangeChuyenNganh(e, row.original)}
            >
              {dataMajor.map((item) => (
                <MenuItem key={item.maCN} value={item.maCN}>
                  {item.tenCN}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ),
      },
    ],
    [courseData, teacherData, tableData, dataMajor]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={currentUser.name}
        subtitle={`Danh sách lớp học khoa ${currentUser.name}`}
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
              <Tooltip arrow placement="left" title="Chỉnh sửa thông tin">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Xóa lớp học">
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
          dataMajor={dataMajor}
          listMajor={listMajor}
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
  dataMajor,
  listMajor,
}) => {
  const [values, setValues] = useState({
    maLop: "",
    class_name: "",
    maGv: "",
    maKhoaHoc: "",
    maCN: null,
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
    console.log("values: ", values);
    const keysToCheck = ["maLop", "class_name", "maKhoaHoc", "maGv"];

    if (isCheckSomeFieldEmpty(values, keysToCheck)) {
      // Hiển thị thông báo hoặc thực hiện logic nếu có trường bị trống
      return toast.warn("Vui lòng điền hết các trường");
    } else {
      // Logic khi không có trường nào bị trống
      // Ví dụ: Gọi hàm xử lý dữ liệu, tiếp tục thực hiện các thao tác khác
      // console.log("value: ", values);
      onSubmit(values);
      onClose();
    }
  };
  const handleChangeCN = (e) => {
    setValues((prev) => ({
      ...prev,
      maCN: e ? e?.value : null,
    }));
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
            <TextField label="Mã Lớp" name="maLop" onChange={handleChange} />

            <TextField
              label="Tên Lớp"
              name="class_name"
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Chọn Giáo Viên
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.maGv}
                label="Chọn Giáo Viên"
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
                Chọn Khóa Học
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.maKhoaHoc}
                label="Chọn Khóa Học"
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

            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">
                Chọn Chuyên Ngành (No Required)
              </InputLabel>
              <SelectV1
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.maCN}
                label="Chọn Chuyên Ngành"
                onChange={handleChange}
                name="maCN"
                isSearchable="true"
              >
                {dataMajor.map((item) => (
                  <MenuItem key={item.maCN} value={item.maCN}>
                    {item.tenCN}
                  </MenuItem>
                ))}
              </SelectV1> */}
              <SelectV1
                options={listMajor}
                styles={customStyles}
                placeholder="Chọn chuyên ngành"
                name="maCN"
                onChange={(e) => handleChangeCN(e)}
                isClearable={true}
              />
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
          Thêm Mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuanLyLopHoc;
