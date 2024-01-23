import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);
const LineChart = () => {
  const options = {
    title: {
      text: "Biểu đồ thống kê tỉ lệ % điểm rèn luyện",
      align: "left",
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      categories: ["hk2-2023-2024"],
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "Xuất Sắc",
        data: [43934],
      },
      {
        name: "Tốt",
        data: [24916],
      },
      {
        name: "Trung Bình",
        data: [11744],
      },
      {
        name: "Operations & Maintenance",
        data: [10077],
      },
      {
        name: "Other",
        data: [21908],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
