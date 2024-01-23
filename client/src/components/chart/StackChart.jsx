import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);
const StackChart = () => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Thống kê điêm rèn luyện",
      align: "left",
    },
    xAxis: {
      categories: ["hk2-2023-2024"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số sinh viên",
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },

    plotOptions: {
      column: {
        stacking: "normal",
        pointWidth: 30,
      },
    },
    series: [
      {
        name: "Xuất Sắc",
        data: [3],
      },
      {
        name: "Giỏi",
        data: [14],
      },
      {
        name: "Khá",
        data: [30],
      },
      {
        name: "Trung Bình Khá",
        data: [10],
      },
      {
        name: "Trung Bình",
        data: [2],
      },
      {
        name: "Yếu",
        data: [0],
      },
      {
        name: "Kém",
        data: [0],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StackChart;
