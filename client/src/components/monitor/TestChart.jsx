import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import RadarChart from "./RadarChart";
import CombinedChart from "./CombinedChart";
import ChartHori from "./ChartHori";
// import ChartHori2 from "./ChartHori2";
import ChartHori3 from "./ChartHori3";
import PieChartV2 from "./PieChartV2";
import BasicColumn from "./BasicColumn";
import ColumnRange from "./ColumnRange";

const dataTLHNCN = [
  { name: "Nghèo", y: 10.42, value: 2262209, color: "#dc3e1e" },
  { name: "CN", y: 5.77, value: 1252919, color: "#f0f023" },
  {
    name: "Hộ có mức sống trung bình",
    y: 20.33,
    value: 5011676,
    color: "#16d72a",
  },

  { name: "KN", y: 63.48, value: 18202416, color: "#33ebff" },
];

const dataPNHN = [
  {
    name: "Hộ nghèo dân tộc thiểu số",
    y: 25.79,
    value: 231,
    color: "#dc3e1e",
  },
  {
    name: "Hộ nghèo không có khả năng lao động",
    y: 14.84,
    value: 133,
    color: "#16d72a",
  },

  {
    name: "Hộ nghèo có thành viên là người có công với cách mạng",
    y: 59.37,
    value: 532,
    color: "#33ebff",
  },
];

const dataPNHCN = [
  {
    name: "Hộ cận nghèo dân tộc thiểu số",
    y: 47.71,
    value: 323,
    color: "#dc3e1e",
  },
  {
    name: "Hộ cận nghèo không có khả năng lao động",
    y: 34.42,
    value: 233,
    color: "#16d72a",
  },

  {
    name: "Hộ cận nghèo có thành viên là người có công với cách mạng",
    y: 17.87,
    value: 121,
    color: "#33ebff",
  },
];

const dataSLHNHCN = {
  seriesData: [
    {
      name: "Hộ nghèo",
      data: [745, 250, 600, 240, 30, 440],
    },
    {
      name: "Cận nghèo",
      data: [255, 200, 410, 160, 20, 240],
    },
  ],
  listCategoriesXAxis: [
    "Trung du và miền núi phía Bắc",
    "Đồng bằng sông Hồng",
    "Bắc Trung Bộ và Duyên Hải miền Trung",
    "Tây Nguyên",
    "Đông Nam Bộ",
    "Đồng bằng sông Cửu Long",
  ],
};

// trong fake data có dữ liệu hộ nghèo và hộ cận nghèo của 6 vùng trên toàn quốc, trong mỗi vùng sẽ có:
/*
- seriesData: là một mảng object trong đó có name và value để hiện thị trên biểu đồ cột
- listCategoriesXAxis: đây là các label hiển thị trên tục X
- dataHuyen: 
  + là 1 mảng cũng có seriesData và categoryAxis
  + trong đó sẽ có 1 mảng dataXa
*/
const fakeData = [
  {
    seriesData: [
      {
        name: "Hộ nghèo",
        data: [745, 250, 600, 240, 30, 440, 120, 40, 90, 300, 12, 40, 200, 400],
      },
      {
        name: "Cận nghèo",
        data: [
          255, 200, 410, 160, 20, 240, 255, 200, 410, 160, 20, 240, 45, 60,
        ],
      },
    ],
    listCategoriesXAxis: [
      "Hà Giang",
      "Cao Bằng ",
      "Bắc Kạn",
      "Lạng Sơn",
      "Tuyên Quang",
      "Yên Bái",
      "Thái Nguyên",
      "Phú Thọ",
      "Bắc Giang",
      "Lai Châu",
      "Điện Biên",
      "Sơn La",
      "Hòa Bình",
      "Lào Cai",
    ],
    dataHuyen: [
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [745, 250, 600, 240, 30, 440, 120, 40, 90, 300],
          },
          {
            name: "Cận nghèo",
            data: [255, 200, 410, 160, 20, 240, 255, 200, 410, 160],
          },
        ],
        listCategoriesXAxis: [
          "Bắc Mê",
          "Bắc Quang",
          "Đồng Văn",
          "Hoàng Su Phì",
          "Mèo Vạc",
          "Quản Bạ",
          "Quang Bình",
          "Vị Xuyên",
          "Xí Mần",
          "Yên Minh",
        ],
        dataXa: [
          {
            seriesData: [
              {
                name: "Hộ nghèo",
                data: [
                  745, 250, 600, 240, 30, 440, 120, 40, 90, 300, 250, 600, 240,
                ],
              },
              {
                name: "Cận nghèo",
                data: [
                  255, 200, 410, 160, 20, 240, 255, 200, 410, 160, 255, 200,
                  410,
                ],
              },
            ],
            listCategoriesXAxis: [
              "Thị trấn Yên Phú",
              "Yên Định",
              "Minh Ngọc",
              "Thượng Tân",
              "Minh Sơn",
              "Lạc Nông",
              "Giáp Trung",
              "Yên Phong",
              "Phú Nam",
              "Yên Cường",
              "Đường Âm",
              "Đường Hồng",
              "Phiêng Luông",
            ],
          },
          {
            seriesData: [
              {
                name: "Hộ nghèo",
                data: [
                  15, 40, 745, 250, 600, 240, 30, 440, 120, 40, 90, 300, 250,
                  600, 240,
                ],
              },
              {
                name: "Cận nghèo",
                data: [
                  70, 120, 255, 200, 410, 160, 20, 240, 255, 200, 410, 160, 255,
                  200, 410,
                ],
              },
            ],
            listCategoriesXAxis: [
              "Xín Cái",
              "Vĩnh Hảo",
              "Đài Sơn",
              "Tiên Kiều",
              "Sơn Thủy",
              "Đồng Tâm",
              "Tân Lập",
              "Thượng Bình",
              "Đường Thượng",
              "Đồng Văn",
              "Vân An",
              "Tiên Nguyên",
              "Phương Viên",
              "Việt Vinh",
              "Lũng Nam",
            ],
          },
        ],
      },
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [345, 450, 100, 240, 30, 440, 220, 40, 90, 200],
          },
          {
            name: "Cận nghèo",
            data: [155, 200, 410, 160, 20, 240, 255, 200, 310, 60],
          },
        ],
        listCategoriesXAxis: [
          "Thành phố Cao Bằng",
          "Huyện Bảo Lạc",
          "Huyện Bảo Lâm",
          "Huyện Hạ Lang",
          "Huyện Hà Quảng",
          "Huyện Hòa An",
          "Huyện Nguyên Bình",
          "Huyện Quảng Hòa",
          "Huyện Thạch An",
          "Huyện Trùng Khánh",
        ],
        dataXa: [
          {
            seriesData: [
              {
                name: "Hộ nghèo",
                data: [
                  745, 250, 600, 240, 30, 440, 120, 40, 90, 300, 250, 600, 240,
                ],
              },
              {
                name: "Cận nghèo",
                data: [
                  255, 200, 410, 160, 20, 240, 255, 200, 410, 160, 255, 200,
                  410,
                ],
              },
            ],
            listCategoriesXAxis: [
              "Xã Cao Bằng 1",
              "Xã Cao Bằng 1",
              "Xã Cao Bằng 1",
              "Xã Cao Bằng 1",
              "Xã Cao Bằng 1",
              "Xã Cao Bằng 1",
              "Xã Cao Bằng 2",
              "Xã Cao Bằng 2",
              "Xã Cao Bằng 2",
              "Xã Cao Bằng 2",
              "Xã Cao Bằng 2",
              "Xã Cao Bằng 2",
              "Xã Cao Bằng 2",
            ],
          },
          {
            seriesData: [
              {
                name: "Hộ nghèo",
                data: [
                  15, 40, 745, 250, 600, 240, 30, 440, 120, 40, 90, 300, 250,
                  600, 240,
                ],
              },
              {
                name: "Cận nghèo",
                data: [
                  70, 120, 255, 200, 410, 160, 20, 240, 255, 200, 410, 160, 255,
                  200, 410,
                ],
              },
            ],
            listCategoriesXAxis: [
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
              "Xã thuộc huyện Bảo Lạc",
            ],
          },
        ],
      },
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [345, 450, 100, 240, 30, 440, 220, 40],
          },
          {
            name: "Cận nghèo",
            data: [410, 160, 20, 240, 255, 200, 310, 60],
          },
        ],
        listCategoriesXAxis: [
          "Thành phố Bắc Kạn",
          "Huyện Ba Bể",
          "Huyện Bạch Thông",
          "Huyện Chợ Đồn",
          "Huyện Chợ Mới",
          "Huyện Na Rì",
          "Huyện Ngân Sơn",
          "Huyện Pác Nặm",
        ],
      },
    ],
  },
  {
    seriesData: [
      {
        name: "Hộ nghèo",
        data: [30, 440, 120, 40, 90, 300, 12, 40, 200, 400, 150],
      },
      {
        name: "Cận nghèo",
        data: [255, 20, 240, 255, 200, 410, 160, 20, 240, 45, 60],
      },
    ],
    listCategoriesXAxis: [
      "Hà Nội",
      "Hải Phòng",
      "Quảng Ninh",
      "Vĩnh Phúc",
      "Bắc Ninh",
      "Hải Dương",
      "Hưng Yên",
      "Thái Bình",
      "Hà Nam",
      "Nam Định",
      "Ninh Bình",
    ],
    dataHuyen: [
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [
              345, 450, 100, 240, 30, 440, 220, 40, 90, 200, 222, 122, 80, 550,
              420, 155, 90, 60,
            ],
          },
          {
            name: "Cận nghèo",
            data: [
              155, 200, 410, 160, 20, 240, 255, 200, 310, 60, 345, 450, 100,
              240, 30, 440, 220, 40,
            ],
          },
        ],
        listCategoriesXAxis: [
          "Đan Phượng",
          "Gia Lâm",
          "Đông Anh",
          "Chương Mỹ",
          "Hoài Đức",
          "Ba Vì",
          "Mỹ Đức",
          "Phúc Thọ",
          "Thạch Thất",
          "Quốc Oai",
          "Thanh Trì",
          "Thường Tín",
          "Thanh Oai",
          "Phú Xuyên",
          "Mê Linh",
          "Sóc Sơn",
          "Ứng Hòa",
          "Thị xã Tây Sơn",
        ],
      },
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [
              440, 220, 40, 90, 200, 222, 122, 80, 550, 420, 155, 90, 60, 90,
              100,
            ],
          },
          {
            name: "Cận nghèo",
            data: [
              20, 240, 255, 200, 310, 60, 345, 450, 100, 240, 30, 440, 220, 40,
              100,
            ],
          },
        ],
        listCategoriesXAxis: [
          "Đồ Sơn",
          "Dương Kinh",
          "Hải An",
          "Hồng Bàng",
          "Kiến An",
          "Lê Chân",
          "Ngô Quyền",
          "An Dương",
          "An Lão",
          "Bạch Long Vĩ",
          "Cát Hải",
          "Kiến Thuỵ",
          "Thủy Nguyên",
          "Tiên Lãng",
          "Vĩnh Bảo",
        ],
      },
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [
              345, 450, 100, 240, 30, 440, 220, 40, 20, 240, 255, 200, 310, 60,
            ],
          },
          {
            name: "Cận nghèo",
            data: [
              410, 160, 20, 240, 255, 200, 310, 60, 345, 450, 100, 240, 30, 440,
            ],
          },
        ],
        listCategoriesXAxis: [
          "Hạ Long",
          "Móng Cái",
          "Cẩm Phả",
          "Uông Bí",
          "Đông Triều",
          "Quảng Yên",
          "Bình Liêu",
          "Tiên Yên",
          "Đầm Hà",
          "Hải Hà",
          "Ba Chẽ",
          "Vân Đồn",
          "Hoành Bồ",
          "Cô Tô",
        ],
      },
    ],
  },
  {
    seriesData: [
      {
        name: "Hộ nghèo",
        data: [30, 440, 120, 40, 90, 300, 12, 40, 200, 400, 150, 300, 12, 40],
      },
      {
        name: "Cận nghèo",
        data: [255, 20, 240, 255, 200, 410, 160, 20, 240, 45, 60, 20, 240, 255],
      },
    ],
    listCategoriesXAxis: [
      "Thanh Hoá",
      "Nghệ An",
      "Hà Tĩnh",
      "Quảng Bình",
      "Quảng Trị",
      "Thừa Thiên Huế",
      "Đà Nẵng",
      "Quảng Nam",
      "Quảng Ngãi",
      "Bình Định",
      "Phú Yên",
      "Khánh Hoà",
      "Ninh Thuận",
      "Bình Thuận",
    ],
    dataHuyen: [
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [
              345, 450, 100, 240, 30, 440, 220, 40, 90, 200, 222, 122, 80, 550,
              420, 155, 90, 60, 12, 50, 70,
            ],
          },
          {
            name: "Cận nghèo",
            data: [
              155, 200, 410, 160, 20, 240, 255, 200, 310, 60, 345, 450, 100,
              240, 30, 440, 220, 40, 13, 70, 50,
            ],
          },
        ],
        listCategoriesXAxis: [
          "Thị xã Thanh Hóa",
          "Bá Thước",
          "Cẩm Thủy",
          "Đông Sơn",
          "Hà Trung",
          "Hậu Lộc",
          "Hoằng Hóa",
          "Lang Chánh",
          "Nga Sơn",
          "Ngọc Lặc",
          "Như Xuân",
          "Nông Cống",

          "Quan Hóa",
          "Quảng Xương",
          "Thạch Thành",
          "Thiệu Hóa",
          "Thọ Xuân",
          "Thường Xuân",
          "Tĩnh Gia",
          "Vĩnh Lộc",
          "Yên Định",
        ],
      },
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [
              440, 220, 40, 90, 200, 222, 122, 80, 550, 420, 155, 90, 60, 90,
              100,
            ],
          },
          {
            name: "Cận nghèo",
            data: [
              20, 240, 255, 200, 310, 60, 345, 450, 100, 240, 30, 440, 220, 40,
              100,
            ],
          },
        ],
        listCategoriesXAxis: [
          "Quỳnh Lưu",
          "Diễn Châu",
          "Nghi Lộc",
          "Yên Thành",
          "Hưng Nguyên",
          "Nghĩa Đàn",
          "Quỳ Hợp",
          "Quỳ Châu",
          "Quế Phong",
          "Tân Kỳ",
          "Đô Lương",
          "Anh Sơn",
          "Con Cuông",
          "Tương Dương",
          "Kỳ Sơn",
        ],
      },
      {
        seriesData: [
          {
            name: "Hộ nghèo",
            data: [345, 450, 100, 240, 30, 440, 220, 40, 20, 240],
          },
          {
            name: "Cận nghèo",
            data: [410, 160, 20, 240, 345, 450, 100, 240, 30, 440],
          },
        ],
        listCategoriesXAxis: [
          "Can Lộc",
          "Cẩm Xuyên",
          "Đức Thọ",
          "Hương Khê",
          "Hương Sơn",
          "Lộc Hà",
          "Kỳ Anh",
          "Nghi Xuân",
          "Vũ Quang",
          "Thạch Hà",
        ],
      },
    ],
  },
  {
    seriesData: [
      {
        name: "Hộ nghèo",
        data: [30, 440, 120, 40, 90],
      },
      {
        name: "Cận nghèo",
        data: [255, 20, 240, 255, 200],
      },
    ],
    listCategoriesXAxis: [
      "Kon Tum",
      "Gia Lai",
      "Đắk Lắk",
      "Đắk Nông",
      "Lâm Đồng",
    ],
  },
  {
    seriesData: [
      {
        name: "Hộ nghèo",
        data: [30, 240, 110, 240, 90],
      },
      {
        name: "Cận nghèo",
        data: [255, 20, 240, 255, 200],
      },
    ],
    listCategoriesXAxis: [
      "Tây Ninh",
      "Bình Phước",
      "Bình Dương",
      "Đồng Nai",
      "Bà Rịa - Vũng Tàu",
    ],
  },
  {
    seriesData: [
      {
        name: "Hộ nghèo",
        data: [30, 240, 110, 240, 90, 40, 90, 300, 12, 40, 200, 400, 285],
      },
      {
        name: "Cận nghèo",
        data: [255, 20, 240, 255, 200, 30, 240, 110, 240, 90, 40, 90, 80],
      },
    ],
    listCategoriesXAxis: [
      "An Giang",
      "Bến Tre",
      "Bạc Liêu",
      "Cà Mau",
      "Đồng Tháp",
      "Hậu Giang",
      "Kiên Giang",
      "Long An",
      "Sóc Trăng",
      "Tiền Giang",
      "Trà Vinh",
      "Vĩnh Long",
      "thành phố Cần Thơ",
    ],
  },
];

const Chart = () => {
  const [valueOptionVung, setValueOptionVung] = useState();
  const [openSelectTinh, setOpenSelectTinh] = useState(false);
  const [openSelectHuyen, setOpenSelectHuyen] = useState(false);

  const [valueOptionTinh, setValueOptionTinh] = useState();
  const [valueOptionHuyen, setValueOptionHuyen] = useState();
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // value to
  const [arr, setArr] = useState(dataSLHNHCN.listCategoriesXAxis);
  const [arrStatic, setArrStatic] = useState(dataSLHNHCN.listCategoriesXAxis);
  const [value, setValue] = useState(dataSLHNHCN.seriesData);
  const [valueStatic, setValueStatic] = useState(dataSLHNHCN.seriesData);
  // value tinh
  const [arrTinh, setArrTinh] = useState([]);
  const [arrHuyen, setArrHuyen] = useState([]);

  // console.log(fakeData[0]);
  useEffect(() => {
    // Set all checkboxes to be checked initially
    setCheckedCheckboxes(
      Array.from({ length: arrStatic.length }, (_, idx) => idx)
    );
  }, [arrStatic]);
  const handleCheckboxChange = (idx) => {
    if (checkedCheckboxes.includes(idx)) {
      setCheckedCheckboxes(checkedCheckboxes.filter((item) => item !== idx));
    } else {
      setCheckedCheckboxes([...checkedCheckboxes, idx]);
    }
  };

  const handleApplyClick = () => {
    const uncheckedValues = arrStatic.filter((item, idx) =>
      checkedCheckboxes.includes(idx)
    );
    setArr(uncheckedValues);
    const newValue = valueStatic.map((item) => {
      return {
        name: item.name,
        data: item.data.filter((item, idx) => checkedCheckboxes.includes(idx)),
      };
    });

    setValue(newValue);
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setArr(fakeData[e.target.value].listCategoriesXAxis);
      setValue(fakeData[e.target.value].seriesData);
      setArrStatic(fakeData[e.target.value].listCategoriesXAxis);
      setValueStatic(fakeData[e.target.value].seriesData);
      setOpenSelectTinh(true);
      setValueOptionTinh(e.target.value);
      setArrTinh(fakeData[e.target.value].listCategoriesXAxis);
    } else {
      setOpenSelectTinh(false);
      setOpenSelectHuyen(false);
      setArrStatic(dataSLHNHCN.listCategoriesXAxis);
      setArr(dataSLHNHCN.listCategoriesXAxis);
      setValue(dataSLHNHCN.seriesData);
    }
  };

  const handleChangeSelectTinh = (e) => {
    if (e.target.value) {
      setOpenSelectHuyen(true);
      setValueOptionHuyen(e.target.value);
      setArrStatic(
        fakeData[valueOptionTinh].dataHuyen[e.target.value].listCategoriesXAxis
      );
      setValueStatic(
        fakeData[valueOptionTinh].dataHuyen[e.target.value].seriesData
      );
      setArr(
        fakeData[valueOptionTinh].dataHuyen[e.target.value].listCategoriesXAxis
      );
      setValue(fakeData[valueOptionTinh].dataHuyen[e.target.value].seriesData);
      setArrHuyen(
        fakeData[valueOptionTinh].dataHuyen[e.target.value].listCategoriesXAxis
      );
    } else {
      setOpenSelectHuyen(false);
      setArrStatic(fakeData[valueOptionTinh].listCategoriesXAxis);
      setValue(fakeData[valueOptionTinh].seriesData);
      setArr(fakeData[valueOptionTinh].listCategoriesXAxis);
    }
  };

  const handleChangeSelectHuyen = (e) => {
    if (e.target.value) {
      setArrStatic(
        fakeData[valueOptionTinh].dataHuyen[valueOptionHuyen].dataXa[
          e.target.value
        ].listCategoriesXAxis
      );
      setArr(
        fakeData[valueOptionTinh].dataHuyen[valueOptionHuyen].dataXa[
          e.target.value
        ].listCategoriesXAxis
      );
      setValue(
        fakeData[valueOptionTinh].dataHuyen[valueOptionHuyen].dataXa[
          e.target.value
        ].seriesData
      );
    } else {
      setArrStatic(
        fakeData[valueOptionTinh].dataHuyen[valueOptionHuyen]
          .listCategoriesXAxis
      );
      setValue(
        fakeData[valueOptionTinh].dataHuyen[valueOptionHuyen].seriesData
      );
      setArr(
        fakeData[valueOptionTinh].dataHuyen[valueOptionHuyen]
          .listCategoriesXAxis
      );
    }
  };
  return (
    <div className="w-[100%]">
      <div>
        <div>
          <h1 className="font-bold text-[16px]">Bộ lọc</h1>
          <div className="flex gap-5">
            <div>
              <select name="" id="" onChange={handleChange}>
                <option value="">Tất cả vùng</option>
                {dataSLHNHCN.listCategoriesXAxis.map((item, idx) => (
                  <option key={idx} value={idx}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {openSelectTinh && (
              <div>
                <select name="" id="" onChange={handleChangeSelectTinh}>
                  <option value="">Tất cả tỉnh</option>
                  {arrTinh.map((item, idx) => (
                    <option key={idx} value={idx}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {openSelectHuyen && (
              <div>
                <select name="" id="" onChange={handleChangeSelectHuyen}>
                  <option value="">Tất cả huyện</option>
                  {arrHuyen.map((item, idx) => (
                    <option key={idx} value={idx}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <ul className="h-[300px] overflow-auto">
              {arrStatic.map((item, idx) => {
                return (
                  <li key={idx}>
                    <input
                      type="checkbox"
                      className="w-[auto]"
                      value={idx}
                      id={idx}
                      checked={checkedCheckboxes.includes(idx)}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                    <label htmlFor={idx}>{item}</label>
                  </li>
                );
              })}
            </ul>
            <div>
              <button onClick={handleApplyClick}>Áp dụng</button>
            </div>
          </div>
        </div>
        <BarChart
          seriesData={value}
          textTitle={"SỐ LƯỢNG HỘ NGHÈO VÀ HỘ CẬN NGHÈO THEO VÙNG"}
          titleYAxis={"Số lượng hộ (nghìn)"}
          listCategoriesXAxis={arr}
        />
      </div>
      <div>
        <PieChart
          data={dataTLHNCN}
          textTitle={"Tỉ lệ hộ nghèo và hộ cận nghèo"}
        />
      </div>
      <div>
        <PieChart
          data={dataPNHN}
          textTitle={"Tỉ lệ hộ nghèo theo các nhóm đối tượng"}
        />
      </div>
      <div>
        <PieChart
          data={dataPNHCN}
          textTitle={"Tỉ lệ hộ cận nghèo theo các nhóm đối tượng"}
        />
      </div>
      <div className="w-[50%]">
        <RadarChart />
      </div>
      <div>
        <CombinedChart />
      </div>
      <div className="w-[60%]">
        <ChartHori />
      </div>
      <div>
        <ColumnRange />
      </div>
      <div>
        <PieChartV2 data={dataPNHN} />
      </div>
      <div>
        <BasicColumn />
      </div>
    </div>
  );
};

export default Chart;
