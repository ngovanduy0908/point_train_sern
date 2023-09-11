import Chart from "components/chart/Chart";
import React from "react";

const ColumnRange = () => {
  const options = {
    chart: {
      type: "columnrange",
      inverted: true,
    },
    title: {
      text: "Temperature variation by month",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Temperature ( °C )",
      },
    },

    tooltip: {
      valueSuffix: "°C",
    },
    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Temperatures",
        data: [
          [-13.9, 5.2],
          [-16.7, 10.6],
          [-4.7, 11.6],
          [-4.4, 16.8],
          [-2.1, 27.2],
          [5.9, 29.4],
          [6.5, 29.1],
          [4.7, 25.4],
          [4.3, 21.6],
          [-3.5, 15.1],
          [-9.8, 12.5],
          [-11.5, 8.4],
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

export default ColumnRange;
