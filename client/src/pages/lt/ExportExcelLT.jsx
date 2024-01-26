import { Box, Button, Grid } from "@mui/material";
import Header from "components/Header";
import { AuthContext } from "context/authContext";
import Select from "react-select";
import { toast } from "react-toastify";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { useContext, useEffect, useState } from "react";
import { generateOptionsListDanhSach } from "utils/define";
import ModalV2 from "components/modal/ModalV2";
import { getListSemester } from "utils/getMany/getListSemesters";
import { getManyInfoBySV } from "utils/getDetails/getManyInfoBySV";
import {
  generateUrlExcel,
  handleDataExportExcelGV,
} from "utils/postDetails/handleDataExportExcelGV";
import Progress from "components/Progress";
const optionsListDanhSach = generateOptionsListDanhSach();
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue" : "white",
    color: state.isSelected ? "white" : "black",
    cursor: "pointer",
    opacity: state.isFocused ? 0.8 : 1,
    transition: "background-color 0.3s",
  }),
};
const ExportExcelLT = () => {
  const { currentUser } = useContext(AuthContext);
  const [dataHocKi, setDataHocKi] = useState([]);
  const [url, setUrl] = useState();
  const [openModalFile, setOpenModaFile] = useState(false);
  const [initChoose, setInitChoose] = useState({
    maLop: "",
    maHK: "",
    danhSachSV: "",
    tenGV: "",
    tenKhoa: "",
  });
  const [loading, setLoading] = useState();
  const fetchData = async () => {
    try {
      const resManyInfo = await getManyInfoBySV(`maSv=${currentUser.maSv}`);
      const { maLop, tenGV, tenKhoa, tenLop } = resManyInfo;
      // console.log("resManyInfo: ", resManyInfo);
      const resSemester = await getListSemester();
      const formatDataHK = resSemester.map((item) => ({
        value: {
          maHK: item.maHK,
          tenHK: item.name,
        },
        label: item.name,
      }));
      setInitChoose((prev) => ({
        ...prev,
        maLop: {
          maLop: maLop,
          tenLop: tenLop,
        },
        tenGV: tenGV,
        tenKhoa: tenKhoa,
        tenLopTruong: currentUser.name,
      }));
      setDataHocKi(formatDataHK);
    } catch (error) {
      console.log(error);
    }
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
  const handleClickView = async () => {
    try {
      if (!initChoose.maHK) return toast.warn("Vui lòng chọn học kì");
      if (!initChoose.danhSachSV)
        return toast.warn("Vui lòng chọn danh sách sinh viên");

      // console.log("value truyen xuong: ", initChoose);
      setOpenModaFile(true);
      setLoading(true);
      const res = await handleDataExportExcelGV(initChoose);
      const res1 = await generateUrlExcel(res.data, "text");
      setUrl(res1.filePath);
      setLoading(false);
      // console.log("res này là gì đấy: ", res);
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
                    // onClick={() => downloadFile(url, "File tong hop DRL.xlsx")}
                  >
                    Tải file
                  </Button>
                </Grid>
              </Grid>
            </Box>
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
          </>
        )}
      </ModalV2>
    </Box>
  );
};

export default ExportExcelLT;
