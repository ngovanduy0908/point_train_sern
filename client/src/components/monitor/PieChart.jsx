import React from "react";
import ReactHighcharts from "react-highcharts";
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const PieChart = ({ data, textTitle }) => {
  const threshold = 5;

  const config = {
    chart: {
      type: "pie",
    },
    title: {
      text: `${textTitle}`,
      style: {
        color: "#0400ff",
        fontWeight: "bold",
        fontSize: "30px",
        fontFamily: "auto",
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
        return this.name + ": " + formatNumberWithCommas(this.value);
      },
    },
    series: [
      {
        name: "Tỉ lệ",
        colorByPoint: true,
        data: data.map((item) => ({
          ...item,
          dataLabels: {
            enabled: true,
            format: "{point.y}%",
            distance: item.y > threshold ? -30 : 30, // Điều chỉnh khoảng cách từ tâm đến nhãn
            color: "#000",
          },
        })),
      },
    ],
  };

  return (
    <div>
      <ReactHighcharts config={config} />
    </div>
  );
};

export default PieChart;
