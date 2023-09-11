import React from "react";
import Chart from "components/chart/Chart";
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const PieChartV2 = ({ textTitle }) => {
  const threshold = 5;

  // const config = {
  //   chart: {
  //     type: "pie",
  //   },
  //   title: {
  //     text: `${textTitle}`,
  //     style: {
  //       color: "#0400ff",
  //       fontWeight: "bold",
  //       fontSize: "30px",
  //       fontFamily: "auto",
  //     },
  //   },
  //   plotOptions: {
  //     pie: {
  //       allowPointSelect: true,
  //       cursor: "pointer",
  //       dataLabels: {
  //         enabled: false,
  //       },
  //       showInLegend: true,
  //     },
  //   },
  //   legend: {
  //     align: "right",
  //     verticalAlign: "bottom",
  //     layout: "vertical",
  //     itemMarginTop: 10,
  //     itemMarginBottom: 10,
  //     labelFormatter: function () {
  //       return this.name + ": " + formatNumberWithCommas(this.value);
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Tỉ lệ",
  //       colorByPoint: true,
  //       data: data.map((item) => ({
  //         ...item,
  //         dataLabels: {
  //           enabled: true,
  //           format: "{point.y}%",
  //           distance: item.y > threshold ? -30 : 30, // Điều chỉnh khoảng cách từ tâm đến nhãn
  //           color: "#000",
  //         },
  //       })),
  //     },
  //   ],
  // };

  const options = {
    chart: {
      type: "pie",
      inverted: true,
    },
    title: {
      text: `Pie Chart v2`,
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
        data: [
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
        ],
      },
    ],
  };

  return (
    <div>
      <Chart options={options} />
    </div>
  );
};

export default PieChartV2;
