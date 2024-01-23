import { Box, Button, Grid } from "@mui/material";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { getListClassByMaGV } from "utils/getMany/getListClassByMaGV";
import { getListSemester } from "utils/getMany/getListSemesters";
import {
  downloadFile,
  generateUrlExcel,
  handleDataExportExcelGV,
} from "utils/postDetails/handleDataExportExcelGV";
import ModalV2 from "components/modal/ModalV2";
import { getNameDepartmentByMa } from "utils/getDetails/getNameDepartmantByMaGv";
import Header from "components/Header";
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
const optionsListDanhSach = [
  {
    label: "Cả Lớp",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN",
      min: 0,
      max: 100,
    },
  },
  {
    label: "Sinh Viên Xuất Sắc",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN XUẤT SẮC",
      min: 90,
      max: 100,
    },
  },
  {
    label: "Sinh Viên Tốt",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN TỐT",
      min: 80,
      max: 89,
    },
  },
  {
    label: "Sinh Viên Khá",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN KHÁ",
      min: 70,
      max: 79,
    },
  },
  {
    label: "Sinh Viên Trung Bình Khá",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN TRUNG BÌNH KHÁ",
      min: 60,
      max: 69,
    },
  },
  {
    label: "Sinh Viên Trung Bình",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN TRUNG BÌNH",
      min: 50,
      max: 59,
    },
  },
  {
    label: "Sinh Viên Yếu",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN YẾU",
      min: 30,
      max: 49,
    },
  },
  {
    label: "Sinh Viên Kém",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN KÉM",
      min: 0,
      max: 29,
    },
  },
  {
    label: "Sinh Viên DRL >= 70",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH VIÊN CÓ ĐIỂM RÈN LUYỆN >= 70",
      min: 70,
      max: 100,
    },
  },
  {
    label: "Sinh Viên DRL >= 80",
    value: {
      title: "BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN SINH CÓ ĐIỂM RÈN LUYỆN >= 80",
      min: 80,
      max: 100,
    },
  },
];
const ExportExcelGV = () => {
  const { currentUser } = useContext(AuthContext);
  const [dataLop, setDataLop] = useState([]);
  const [dataHocKi, setDataHocKi] = useState([]);
  const [url, setUrl] = useState();
  const [tenKhoa, setTenKhoa] = useState();
  const [openModalFile, setOpenModaFile] = useState(false);
  const [initChoose, setInitChoose] = useState({
    maLop: "",
    maHK: "",
    danhSachSV: "",
  });

  const getOneDepartmentByMa = async () => {
    try {
      const res = await getNameDepartmentByMa(`${currentUser.maKhoa}`);
      console.log("res khoa: ", res);
      setTenKhoa(res.tenKhoa);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getOneDepartmentByMa();
  }, []);

  const getClassByMaGV = async () => {
    try {
      const res = await getListClassByMaGV(`maGv=${currentUser.maGv}`);
      const formatDataLop = res.map((item) => ({
        value: {
          maLop: item.maLop,
          tenLop: item.class_name,
        },
        label: item.class_name,
      }));
      // console.log("vao day: ", formatDataLop);
      setDataLop(formatDataLop);
      const resSemester = await getListSemester();
      const formatDataHK = resSemester.map((item) => ({
        value: {
          maHK: item.maHK,
          tenHK: item.name,
        },
        label: item.name,
      }));
      setDataHocKi(formatDataHK);
      //   console.log("hihi: ", resSemester);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClassByMaGV();
  }, []);
  const handleChange = (key, value) => {
    setInitChoose((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleClickView = async () => {
    // console.log("xuong day: ", initChoose);
    try {
      if (!initChoose.maLop) return toast.warn("Vui lòng chọn lớp");
      if (!initChoose.maHK) return toast.warn("Vui lòng chọn học kì");
      if (!initChoose.danhSachSV)
        return toast.warn("Vui lòng chọn danh sách sinh viên");
      //   console.log("res ao: ");
      const valuePost = {
        ...initChoose,
        tenGV: currentUser.name,
        tenKhoa: tenKhoa,
      };
      // console.log("valuie post: ", valuePost);
      const res = await handleDataExportExcelGV(valuePost);
      const res1 = await generateUrlExcel(res.data, "alo");
      //   console.log("res1: ", res1);
      setUrl(res1.filePath);
      setOpenModaFile(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <Box m="2rem 2.5rem">
      <Header title={currentUser.name} subtitle="Xuất báo cáo" />

      <div class="grid grid-cols-4 gap-4">
        <div>
          <Select
            options={dataLop}
            styles={customStyles}
            placeholder="Chọn Lớp"
            required
            onChange={(e) => handleChange("maLop", e.value)}
          />
        </div>
        <div>
          <Select
            options={dataHocKi}
            styles={customStyles}
            placeholder="Chọn Học Kì"
            onChange={(e) => handleChange("maHK", e.value)}
          />
        </div>
        <div>
          <Select
            options={optionsListDanhSach}
            styles={customStyles}
            placeholder="Chọn Danh Sách Sinh Viên"
            onChange={(e) => handleChange("danhSachSV", e.value)}
          />
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClickView()}
          >
            Xem
          </Button>
        </div>
      </div>
      <ModalV2
        open={openModalFile}
        setOpen={setOpenModaFile}
        title={`FILE TỔNG HỢP ĐIỂM RÈN LUYỆN`}
        displayButtonOk={false}
      >
        <Box sx={{ flexGrow: 1 }} m="10px">
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  width: "100%",
                }}
                onClick={() => downloadFile(url, "File tong hop DRL.xlsx")}
              >
                Tải file
              </Button>
            </Grid>
          </Grid>
        </Box>
        <DocViewer
          // ref={docViewerRef}
          documents={[
            {
              uri: url,
              fileType: "docx",
            },
          ]}
          style={{ height: 560 }}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
          pluginRenderers={DocViewerRenderers}
        />
      </ModalV2>
    </Box>
  );
};

export default ExportExcelGV;
