import { Box, Button } from "@mui/material";
import CustomIcon from "components/CustomIcon";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  statisticalAdmin,
  statisticalStackChartAdmin,
} from "utils/getDetails/getStatisticalDepartment";
import { getListSemester } from "utils/getMany/getListSemesters";
import WorkIcon from "@mui/icons-material/Work";
import ClassIcon from "@mui/icons-material/Class";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CardChildChart from "components/department/CardChildChart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import StackChart from "components/chart/StackChart";
import { getListCourse } from "utils/getMany/getListCourse";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyState from "components/EmptyState";
const optionTiLeSoLuong = [
  {
    label: "Số Lượng",
    value: 1,
  },
  {
    label: "Tỉ Lệ",
    value: 2,
  },
];
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
const Overview = () => {
  // const { currentUser } = useContext(AuthContext);
  const selectRefSemester = useRef(null);
  const selectRefCourse = useRef(null);
  const [dataChung, setDataChung] = useState([]);
  const [initChoose, setInitChoose] = useState({
    maHK: "",
    maKhoaHoc: "",
    tiLeOrSoLuong: "",
  });
  const [data, setData] = useState([]);
  const [dataHocKi, setDataHocKi] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [tiLeOrSoLuong, setTiLeOrSoLuong] = useState(1);
  const [title, setTitle] = useState("Thống kê điểm rèn luyện");
  const [xAxis, setXAxis] = useState([
    "KEM",
    "Y",
    "TB",
    "TBK",
    "KHA",
    "G",
    "XS",
  ]);
  const [yAxis, setYAxis] = useState("Số Lượng");
  const fetchStaticData = async () => {
    try {
      const [res, resSemester, resCourse] = await Promise.all([
        statisticalAdmin(),
        getListSemester(),
        getListCourse(),
      ]);
      const countSemester = resSemester?.length;
      const formatRes = [
        {
          icon: <CustomIcon icon={<ApartmentIcon />} />,
          value: res.tongKhoa,
          text: "Khoa",
          bg: "#F3E8FF",
        },
        {
          icon: <CustomIcon icon={<LocalLibraryIcon />} />,
          value: res.tongKhoaHoc,
          text: "Khóa Học",
          bg: "#E8FFEA",
        },

        {
          icon: <CustomIcon icon={<MenuBookIcon />} />,
          value: countSemester,
          text: "Học Kì",
          bg: "#DCFCE7",
        },
        {
          icon: <CustomIcon icon={<WorkIcon />} />,
          value: res.tongGV,
          text: "Giáo Viên",
          bg: "#FFE2E5",
        },
        {
          icon: <CustomIcon icon={<ClassIcon />} />,
          value: res.tongLop,
          text: "Lớp Học",
          bg: "#FFF4DE",
        },
        {
          icon: <CustomIcon icon={<TableRestaurantIcon />} />,
          value: res.tongSV,
          text: "Sinh Viên",
          bg: "#DCFCE7",
        },
      ];
      setDataChung(formatRes);
      const formatDataHK = resSemester.map((item) => ({
        value: {
          maHK: item.maHK,
          tenHK: item.name,
        },
        label: item.name,
      }));
      setDataHocKi(formatDataHK);

      const formatCourse = resCourse.map((item) => ({
        value: {
          maKhoaHoc: item.maKhoaHoc,
          tenKhoaHoc: item.name,
        },
        label: item.name,
      }));
      setDataKhoaHoc(formatCourse);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchStaticData();
  }, []);

  const fetchDataStackChart = async (query) => {
    try {
      const res = await statisticalStackChartAdmin(query);
      // console.log("vao day xem nao: ", res);
      const outputData = res.map((item) => {
        const { tenKhoa, KEM, Y, TB, TBK, KHA, G, XS } = item;
        const data = [KEM, Y, TB, TBK, KHA, G, XS];

        return {
          name: tenKhoa,
          data: data,
        };
      });
      // console.log("out put data: ", outputData);
      setData(outputData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (key, value) => {
    setInitChoose((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClickView = async () => {
    try {
      if (!initChoose.maHK) return toast.warn("Vui lòng chọn học kì");
      if (!initChoose.maKhoaHoc) return toast.warn("Vui lòng chọn khóa học");
      const { maHK, maKhoaHoc, tiLeOrSoLuong } = initChoose;
      const labelYTitle = tiLeOrSoLuong === 1 ? "Số Lượng" : "Tỉ Lệ";
      setYAxis(labelYTitle);
      const query = `maHK=${maHK.maHK}&maKhoaHoc=${maKhoaHoc.maKhoaHoc}&tiLeOrSoLuong=${tiLeOrSoLuong}`;
      // console.log("query data: ", query);
      fetchDataStackChart(query);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const resetSelect = () => {
    const query = `maHK=''&maKhoaHoc=''&tiLeOrSoLuong=''`;
    fetchDataStackChart(query);
    selectRefSemester.current.clearValue();
    selectRefCourse.current.clearValue();
  };
  return (
    <Box m="1.5rem 2.5rem">
      <div className="mt-2 grid md:grid-cols-4 gap-4 sm:grid-cols-2 items-center">
        {dataChung.length &&
          dataChung.map((generalItem, idx) => (
            <CardChildChart
              key={idx}
              img={generalItem.image}
              value={generalItem.value}
              text={generalItem.text}
              date={generalItem.date}
              bg={generalItem.bg}
              icon={generalItem.icon}
            />
          ))}
      </div>
      <div class="grid grid-cols-4 gap-4 my-2">
        <div>
          <Select
            options={dataHocKi}
            styles={customStyles}
            placeholder="Chọn học kì"
            ref={selectRefSemester}
            onChange={(e) => handleChange("maHK", e?.value)}
          />
        </div>
        <div>
          <Select
            options={dataKhoaHoc}
            styles={customStyles}
            placeholder="Chọn khóa học"
            ref={selectRefCourse}
            onChange={(e) => handleChange("maKhoaHoc", e?.value)}
          />
        </div>
        <div>
          <Select
            options={optionTiLeSoLuong}
            styles={customStyles}
            placeholder="Số lượng"
            onChange={(e) => handleChange("tiLeOrSoLuong", e?.value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClickView()}
            startIcon={<RemoveRedEyeIcon />}
          >
            Xem
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{
              marginLeft: "16px",
            }}
            startIcon={<DeleteIcon />}
            onClick={() => resetSelect()}
          >
            Xóa bộ lọc
          </Button>
        </div>
      </div>
      {data.length ? (
        <StackChart data={data} yTitle={yAxis} xAxis={xAxis} title={title} />
      ) : (
        <EmptyState />
      )}
    </Box>
  );
};

export default Overview;
