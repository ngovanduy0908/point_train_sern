import React from "react";
import ReactHighcharts from "react-highcharts";

const CombinedChart = () => {
  const config = {
    chart: {
      type: "column",
    },
    title: {
      text: "Tỉ lệ việc làm có năng suất trong tổng số lao động làm công ăn lương (%) và thu nhập thực tế (triệu đồng) (2010-2020)",
      style: {
        color: "#0400ff",
        fontWeight: "bold",
        fontSize: "30px",
        fontFamily: "auto",
      },
    },
    xAxis: {
      categories: ["2010", "2012", "2014", "2016", "2018", "2020"],
    },
    yAxis: [
      {
        title: {
          text: "",
        },
      },
      {
        title: {
          text: "",
        },
        opposite: true,
      },
    ],
    plotOptions: {
      series: {
        pointWidth: 80,
      },
      column: {
        dataLabels: {
          enabled: true,
          format: "{y:.2f}", // Hiển thị giá trị với một chữ số sau dấu thập phân và ký tự % sau
          inside: true, // Hiển thị bên trong cột
          align: "center", // Hiển thị ở tâm giữa
        },
      },
      line: {
        dataLabels: {
          enabled: true,
          format: "{y:,.0f}", // Hiển thị giá trị là số nguyên
        },
        enableMouseTracking: true, // Ch// Cho phép hiển thị giá trị khi di chuột qua
      },
    },

    series: [
      {
        name: "Việc làm có năng xuất(%)",
        data: [65.23, 76.26, 80.24, 87.54, 90.55, 90.65],
        color: "#be6206",
        font: {
          size: 20,
        },
        // dataLabels: {
        //   style: {
        //     fontFamily: "auto",
        //   },
        // },
      },
      {
        name: "Thu nhập thực tế (nghìn đồng)",
        type: "line",
        yAxis: 1,
        data: [2409, 2787, 2964, 3300, 3547, 3768],
        color: "#021a69",
      },
    ],
  };

  return (
    <div>
      <ReactHighcharts config={config} />
    </div>
  );
};

export default CombinedChart;
