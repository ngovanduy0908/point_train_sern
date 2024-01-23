import { Box } from "@mui/material";
import axios from "axios";
import BasicColumn from "components/chart/BasicColumn";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { getListClassByMaGV } from "utils/getMany/getListClassByMaGV";
const DOMAIN = process.env.REACT_APP_DOMAIN;
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
const OverviewGV = () => {
  const { currentUser } = useContext(AuthContext);
  const [maLop, setMaLop] = useState("");
  const [tiLeOrSoLuong, setTiLeOrSoLuong] = useState(1);
  const [xAxis, setXAxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [dataLop, setDataLop] = useState([]);
  const [yAxis, setYAxis] = useState("Số Lượng");
  const getClassByMaGV = async () => {
    try {
      const res = await getListClassByMaGV(`maGv=${currentUser.maGv}`);
      const formatDataLop = res.map((item) => ({
        value: item.maLop,
        label: item.class_name,
      }));
      // console.log("vao day: ", formatDataLop);
      setMaLop(res[0].maLop);
      setDataLop(formatDataLop);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClassByMaGV();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${DOMAIN}/points/point_basic_chart?maLop=${maLop}&tiLeOrSoLuong=${tiLeOrSoLuong}`
      );
      const sortedArray = res.data.sort((a, b) => b.maHK.localeCompare(a.maHK));

      // console.log("chart: ", res.data);
      if (res.data.length) {
        console.log("data tra ra: ", res);

        const keys = Object.keys(res.data[0]);

        // Lọc keys không mong muốn
        const filteredKeys = keys.filter(
          (key) => key !== "maHK" && key !== "TongSV"
        );

        // Tạo mảng kết quả
        const transformedArray = filteredKeys.map((key) => {
          return {
            name: key,
            data: sortedArray.map((item) => item[key]),
          };
        });
        const maHKArray = sortedArray.map((item) => item.maHK);
        setXAxis(maHKArray);
        setSeriesData(transformedArray);
      } else {
        // console.log("data xg day tra ra: ");
        setXAxis([]);
        setSeriesData([]);
      }
      // console.log(maHKArray);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [maLop, tiLeOrSoLuong]);

  const handleChangeLop = (e) => {
    // console.log(e);
    setMaLop(e.value);
    if (xAxis.length) {
      toast.warn("Không có dữ liệu");
    }
  };
  const handleChangeTiLe = (e) => {
    setTiLeOrSoLuong(e.value);
    setYAxis(e.label);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <div class="grid grid-cols-4 gap-4 my-2">
        <div>
          <Select
            options={dataLop}
            styles={customStyles}
            onChange={(e) => handleChangeLop(e)}
          />
        </div>
        <div>
          <Select
            options={optionTiLeSoLuong}
            styles={customStyles}
            onChange={(e) => handleChangeTiLe(e)}
          />
        </div>
      </div>
      <BasicColumn xAxis={xAxis} seriesData={seriesData} yAxis={yAxis} />
    </Box>
  );
};

export default OverviewGV;
