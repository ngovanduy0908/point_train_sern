import React from "react";
import Chart from "./Chart";
import { formatNumberWithCommas } from "utils/function/formatNumberWithCommas";

const PieChart = ({ data }) => {
  //   console.log('data: ', data);
  const threshold = 5;

  const options = {
    chart: {
      type: "pie",
      inverted: true,
    },
    title: {
      enabled: false,
      text: "Tỉ lệ điểm rèn luyện sinh viên",
      align: "left",
      style: {
        textTransform: "uppercase",
        fontSize: "20px",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      align: "right",
      verticalAlign: "bottom",
      layout: "vertical",
      itemMarginTop: 10,
      itemMarginBottom: 10,
      labelFormatter: function () {
        return (
          this.name + ": <b>" + formatNumberWithCommas(this.value) + "</b>"
        );
      },
    },
    series: [
      {
        name: "Tỉ lệ",
        colorByPoint: true,
        dataLabels: {
          format: "({point.y})",
        },
        data: data.map((item) => ({
          ...item,
          dataLabels: {
            enabled: true,
            format: `${item.name}:  {point.y}%`,
            distance: item.y > threshold ? -30 : 30, // Điều chỉnh khoảng cách từ tâm đến nhãn
            color: "#000",
          },
        })),
      },
    ],
  };
  return (
    <div className="h-full">
      <Chart options={options} />
    </div>
  );
};

export default PieChart;
