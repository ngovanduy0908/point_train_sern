import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);
const BasicColumn = ({ seriesData, xAxis, yAxis, title }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: title,
      align: "left",
    },

    xAxis: {
      categories: xAxis,
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxis,
      },
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true, // Cho phép hiển thị dữ liệu trên cột
          format: "{point.y}", // Định dạng hiển thị dữ liệu (ở đây là giá trị y)
        },
      },
    },
    series: seriesData,
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BasicColumn;
