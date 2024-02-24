import { Box, Button, Grid } from "@mui/material";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

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
import { generateOptionsListDanhSach } from "utils/define";
import Progress from "components/Progress";
import ViewTable from "components/viewPointTable/ViewTable";
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
const optionsListDanhSach = generateOptionsListDanhSach();
const ExportExcelGV = () => {
  const { currentUser } = useContext(AuthContext);
  const [dataLop, setDataLop] = useState([]);
  const [dataHocKi, setDataHocKi] = useState([]);
  const [tenKhoa, setTenKhoa] = useState();
  const [url, setUrl] = useState(null);
  const [openModalFile, setOpenModaFile] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState(null);
  const [initChoose, setInitChoose] = useState({
    maLop: "",
    maHK: "",
    danhSachSV: "",
  });

  const getOneDepartmentByMa = async () => {
    try {
      const res = await getNameDepartmentByMa(`${currentUser.maKhoa}`);
      // console.log("res khoa: ", res);
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
    try {
      if (!initChoose.maLop) return toast.warn("Vui lòng chọn lớp");
      if (!initChoose.maHK) return toast.warn("Vui lòng chọn học kì");
      if (!initChoose.danhSachSV)
        return toast.warn("Vui lòng chọn danh sách sinh viên");
      setOpenModaFile(true);

      setLoading(true);
      const valuePost = {
        ...initChoose,
        tenGV: currentUser.name,
        tenKhoa: tenKhoa,
      };
      // console.log("click vao day khong nao: ", valuePost);
      const res = await handleDataExportExcelGV(valuePost);
      // console.log("res: ", res);
      const res1 = await generateUrlExcel(res.dataBuffer.data, "excel_gv");
      setData(res.data);
      // console.log("vao day: ", res1);

      setUrl(res1.filePath);
      setLoading(false);
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
      {
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
                      onClick={() =>
                        downloadFile(url, "File tong hop DRL.xlsx")
                      }
                    >
                      Tải file
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <div className="h-[560px]">
                <ViewTable dataTable={data} />
              </div>

              {/* <DocViewer
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
            /> */}
            </>
          )}
        </ModalV2>
      }
    </Box>
  );
};

export default ExportExcelGV;
