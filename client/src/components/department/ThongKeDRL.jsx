import { Box, Button, Grid } from "@mui/material";
import Header from "components/Header";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getListSemester } from "utils/getMany/getListSemesters";
import Select from "react-select";
import { generateOptionsListDanhSach } from "utils/define";
import { getListCourse } from "utils/getMany/getListCourse";
import { getListClass } from "utils/getMany/getListClass";
import { handleDataExportExcelKhoa } from "utils/postDetails/handleDataExportExcelKhoa";
import { getListMajor } from "utils/getMany/getListMajor";
import ModalV2 from "components/modal/ModalV2";
import Progress from "components/Progress";
import {
  downloadFile,
  generateUrlExcel,
} from "utils/postDetails/handleDataExportExcelGV";
import { toast } from "react-toastify";
import { isCheckSomeFieldEmpty } from "utils/function/validateValue";
import ViewTable from "components/viewPointTable/ViewTable";

const optionsListDanhSach = generateOptionsListDanhSach();

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
const optionsOne = [
  {
    label: "Danh Sách Chuyên Ngành",
    value: 1,
  },
  {
    label: "Danh Sách Theo Lớp",
    value: 2,
  },
];
const ThongKeDRL = () => {
  const { currentUser } = useContext(AuthContext);
  const [dataLop, setDataLop] = useState([]);
  const [dataHocKi, setDataHocKi] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [data, setData] = useState(null);

  const [tenKhoa, setTenKhoa] = useState();
  const [url, setUrl] = useState();
  const [openModalFile, setOpenModaFile] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [loading, setLoading] = useState();
  const [initChoose, setInitChoose] = useState({
    maLop: "",
    maHK: "",
    danhSachSV: "",
    maCN: "",
    maKhoaHoc: "",
    isLop: 1,
  });
  const selectRefClass = useRef(null);
  const selectRefMajor = useRef(null);

  const fetchData = async () => {
    const [resSemester, resCourse, resClass, resMajor] = await Promise.all([
      getListSemester(),
      getListCourse(),
      getListClass(`${currentUser.maKhoa}`),
      getListMajor(),
    ]);
    const formatDataHK = resSemester.map((item) => ({
      value: {
        maHK: item.maHK,
        tenHK: item.name,
      },
      label: item.name,
    }));
    const formatDataCourse = resCourse.map((item) => ({
      value: {
        maKhoaHoc: item.maKhoaHoc,
        tenKhoaHoc: item.name,
      },
      label: item.name,
    }));
    const formatDataLop = resClass.table1.map((item) => ({
      value: {
        maLop: item.maLop,
        tenLop: item.class_name,
      },
      label: item.class_name,
    }));
    const formatDataMajor = resMajor.map((item) => ({
      value: {
        maCN: item.maCN,
        tenCN: item.tenCN,
      },
      label: item.tenCN,
    }));
    setDataLop(formatDataLop);
    setDataHocKi(formatDataHK);
    setTenKhoa(currentUser?.name);
    setDataCourse(formatDataCourse);
    setDataMajor(formatDataMajor);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (key, value) => {
    setInitChoose((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleChangeOne = (value) => {
    if (value === 1) {
      // console.log("bang 1 ne");
      setShowClass(false);
      setInitChoose((prev) => ({
        ...prev,
        maCN: "",
        maKhoaHoc: "",
      }));
    } else {
      // console.log("bang 2 ne");
      setShowClass(true);
      setInitChoose((prev) => ({
        ...prev,
        maLop: "",
      }));
    }
    selectRefClass?.current?.clearValue();
  };
  const handleClickView = async () => {
    const keyArrCheck = showClass
      ? ["maLop", "maHK", "danhSachSV"]
      : ["maCN", "maKhoaHoc", "maHK", "danhSachSV"];
    if (isCheckSomeFieldEmpty(initChoose, keyArrCheck)) {
      // Hiển thị thông báo hoặc thực hiện logic nếu có trường bị trống
      return toast.warn("Vui lòng điền hết các trường");
    } else {
      setOpenModaFile(true);
      setLoading(true);
      // console.log("value:", initChoose);
      const newValues = {
        ...initChoose,
        tenKhoa: tenKhoa,
        isClass: showClass,
      };
      try {
        const res = await handleDataExportExcelKhoa(newValues);
        const res1 = await generateUrlExcel(res.dataBuffer.data, "excel_khoa");
        // console.log("ress: ", res);
        setData(res.data);
        setUrl(res1.filePath);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box m="2rem 2.5rem">
      <Header title={currentUser.name} subtitle="Xuất báo cáo" />
      <div class="grid grid-cols-4 gap-4">
        <div>
          <Select
            options={optionsOne}
            styles={customStyles}
            placeholder="Danh Sách Chuyên Ngành"
            required
            onChange={(e) => {
              handleChangeOne(e.value);
              handleChange("isLop", e?.value);
            }}
          />
        </div>
        {showClass ? (
          <div>
            <Select
              options={dataLop}
              styles={customStyles}
              placeholder="Chọn Lớp Học"
              required
              ref={selectRefClass}
              onChange={(e) => handleChange("maLop", e?.value)}
            />
          </div>
        ) : (
          <>
            <div>
              <Select
                options={dataMajor}
                styles={customStyles}
                placeholder="Chọn Chuyên Ngành"
                required
                ref={selectRefMajor}
                onChange={(e) => handleChange("maCN", e?.value)}
              />
            </div>
            <div>
              <Select
                options={dataCourse}
                styles={customStyles}
                placeholder="Chọn Khoá Học"
                required
                onChange={(e) => handleChange("maKhoaHoc", e?.value)}
              />
            </div>
          </>
        )}

        <div>
          <Select
            options={dataHocKi}
            styles={customStyles}
            placeholder="Chọn Học Kì"
            required
            onChange={(e) => handleChange("maHK", e?.value)}
          />
        </div>
        <div>
          <Select
            options={optionsListDanhSach}
            styles={customStyles}
            placeholder="Chọn Danh Sách Sinh Viên"
            required
            onChange={(e) => handleChange("danhSachSV", e?.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClickView()}
        >
          Xem
        </Button>
      </div>
      <ModalV2
        open={openModalFile}
        setOpen={setOpenModaFile}
        title={`FILE TỔNG HỢP ĐIỂM RÈN LUYỆN`}
        displayButtonOk={false}
      >
        {loading ? (
          <Progress />
        ) : (
          <>
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
            <div className="h-[560px]">
              <ViewTable dataTable={data} isLop={initChoose.isLop} />
            </div>
            {/* {url && (
              <DocViewer
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
            )} */}
          </>
        )}
      </ModalV2>
    </Box>
  );
};

export default ThongKeDRL;
