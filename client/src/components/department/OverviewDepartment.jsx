import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CardChildChart from "./CardChildChart";
import WorkIcon from "@mui/icons-material/Work";
import ClassIcon from "@mui/icons-material/Class";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CustomIcon from "components/CustomIcon";
import { statisticalKhoa } from "utils/getDetails/getStatisticalDepartment";
import { AuthContext } from "context/authContext";
const OverviewDepartment = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log("currentUser: ", currentUser);
  const [value, setValue] = useState({
    tongGV: "",
    tongLop: "",
    tongSV: "",
  });
  const fetchData = async () => {
    try {
      const res = await statisticalKhoa(`maKhoa=${currentUser.maKhoa}`);
      console.log("res: ", res);
      setValue((prev) => ({
        ...prev,
        tongGV: res?.tongGV,
        tongLop: res?.tongLop,
        tongSV: res?.tongSV,
      }));
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
  return (
    <Box m="1.5rem 2.5rem">
      <div className="mt-2 grid md:grid-cols-4 gap-4 sm:grid-cols-2 ">
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
    </Box>
  );
};

export default OverviewDepartment;
