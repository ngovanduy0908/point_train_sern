import React from "react";
import Highcharts from "highcharts";
import ReactHighcharts from "react-highcharts";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);
const ChartHori2 = () => {
  const config = {
    chart: {
      type: "columnrange",
      inverted: true,
    },

    accessibility: {
      description:
        "Image description: A column range chart compares the monthly temperature variations throughout 2017 in Vik I Sogn, Norway. The chart is interactive and displays the temperature range for each month when hovering over the data. The temperature is measured in degrees Celsius on the X-axis and the months are plotted on the Y-axis. The lowest temperature is recorded in March at minus 10.2 Celsius. The lowest range of temperatures is found in December ranging from a low of minus 9 to a high of 8.6 Celsius. The highest temperature is found in July at 26.2 Celsius. July also has the highest range of temperatures from 6 to 26.2 Celsius. The broadest range of temperatures is found in May ranging from a low of minus 0.6 to a high of 23.1 Celsius.",
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
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
          format: "{y}°C",
        },
      },
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        type: "columnrange",
        name: "Temperatures",
        data: [[1, 2]],
      },
    ],
  };
  return (
    <div>
      <ReactHighcharts config={config} />
    </div>
  );
};

export default ChartHori2;
