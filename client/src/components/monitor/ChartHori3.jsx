import React from "react";
import Chart from "components/chart/Chart";

const ChartHori3 = () => {
  const options = {
    chart: {
      type: "columnrange",
      inverted: true,
    },
    title: {
      text: `Người lao động`,
      style: {
        color: "#0400ff",
        fontWeight: "bold",
        fontSize: "30px",
        fontFamily: "auto",
      },
    },
    // title: null,
    xAxis: {
      categories: [
        "Q3/21 so với Q3/20",
        "Q2/21 so với Q2/20",
        "Q1/21 so với Q1/20",
        "Q3/20 so với Q3/19",
        "Q2/20 so với Q2/19",
        "Q1/20 so với Q1/19",
        "Q3/19 so với Q3/18",
        "Q2/19 so với Q2/18",
        "Q1/19 so với Q1/18",
      ],
    },

    yAxis: {
      title: {
        text: "",
      },
    },

    tooltip: {
      valueSuffix: "",
    },

    plotOptions: {
      columnrange: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
          format: "{y}",
        },
      },
    },

    legend: {
      enabled: true,
    },

    series: [
      {
        type: "columnrange",
        name: "Data",
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
        ],
      },
    ],
  };
  return (
    <div>
      <Chart options={options} />
      {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
    </div>
  );
};

export default ChartHori3;
