import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import CardChildChart from "./CardChildChart";
import WorkIcon from "@mui/icons-material/Work";
import ClassIcon from "@mui/icons-material/Class";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CustomIcon from "components/CustomIcon";
import Select from "react-select";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  statisticalKhoa,
  statisticalPieChartKhoa,
} from "utils/getDetails/getStatisticalDepartment";
import { AuthContext } from "context/authContext";
import PieChart from "components/PieChart";
import { getListSemester } from "utils/getMany/getListSemesters";
import EmptyState from "components/EmptyState";
import { getListCourse } from "utils/getMany/getListCourse";
import { toast } from "react-toastify";
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
const OverviewDepartment = () => {
  const { currentUser } = useContext(AuthContext);
  const selectRefSemester = useRef(null);
  const selectRefCourse = useRef(null);

  const [dataHocKi, setDataHocKi] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [initChoose, setInitChoose] = useState({
    maKhoaHoc: "",
    maHK: "",
    danhSachSV: "",
  });
  const [data, setData] = useState([]);
  const [value, setValue] = useState({
    tongGV: "",
    tongLop: "",
    tongSV: "",
  });

  const fetchData = async () => {
    try {
      const [res, resSemester, resCourse] = await Promise.all([
        statisticalKhoa(`maKhoa=${currentUser.maKhoa}`),
        getListSemester(),
        getListCourse(),
      ]);

      setValue((prev) => ({
        ...prev,
        tongGV: res?.tongGV,
        tongLop: res?.tongLop,
        tongSV: res?.tongSV,
      }));

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
    fetchData();
  }, []);
  const pieChartKhoaData = async (query) => {
    try {
      // const {ma}
      const res = await statisticalPieChartKhoa(query);
      const percentKeys = Object.keys(res).filter((key) =>
        key.endsWith("_Percent")
      );
      // Biến đổi thành mảng object
      const resultArray = percentKeys.map((key) => ({
        name: key.replace("_Percent", ""), // Lấy tên mức điểm
        y: res[key], // Giá trị phần trăm
        value: res[key.replace("_Percent", "")], // Giá trị số lượng
      }));
      setData(resultArray);
      // Lọc keys không mong muốn

      // Tạo mảng kết quả
    } catch (error) {
      console.log(error);
    }
  };

  const generalData = [
    {
      icon: <CustomIcon icon={<WorkIcon />} />,
      value: value.tongGV,
      text: "Giáo Viên",
      bg: "#FFE2E5",
    },
    {
      icon: <CustomIcon icon={<ClassIcon />} />,
      value: value.tongLop,
      text: "Lớp Học",
      bg: "#FFF4DE",
    },
    {
      icon: <CustomIcon icon={<TableRestaurantIcon />} />,
      value: value.tongSV,
      text: "Sinh Viên",
      bg: "#DCFCE7",
    },
  ];

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
      const { maHK, maKhoaHoc } = initChoose;
      const query = `maKhoa=${currentUser.maKhoa}&maHK=${maHK.maHK}&maKhoaHoc=${maKhoaHoc.maKhoaHoc}`;
      // console.log("query data: ", query);
      pieChartKhoaData(query);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const resetSelect = () => {
    const query = `maKhoa=''&maHK=''&maKhoaHoc=''`;
    pieChartKhoaData(query);
    selectRefSemester.current.clearValue();
    selectRefCourse.current.clearValue();
  };
  return (
    <Box m="1.5rem 2.5rem">
      <div className="mt-2 grid md:grid-cols-4 gap-4 sm:grid-cols-2 items-center">
        {generalData.map((generalItem, idx) => (
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
      <div className="mt-4 shadow-2xl rounded-lg">
        <div class="grid grid-cols-4 gap-4 mb-4">
          <div>
            <Select
              options={dataHocKi}
              styles={customStyles}
              placeholder="Chọn Học Kì"
              ref={selectRefSemester}
              onChange={(e) => handleChange("maHK", e?.value)}
            />
          </div>
          <div>
            <Select
              options={dataKhoaHoc}
              styles={customStyles}
              placeholder="Chọn Khóa Học"
              ref={selectRefCourse}
              onChange={(e) => handleChange("maKhoaHoc", e?.value)}
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
        {data.length ? <PieChart data={data} /> : <EmptyState />}
      </div>
    </Box>
  );
};

export default OverviewDepartment;
