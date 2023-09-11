import React from "react";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const ChartHori = () => {
  const data = {
    labels: [
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
    datasets: [
      {
        label: "Data",
        data: [
          [-18.5, 0],
          [0, 10.1],
          [-2.6, 0],
          [-3.1, 0],
          [-12.3, 0],
          [0, 2.7],
          [0, 13.8],
          [0, 14.8],
          [0, 11.3],
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Người lao động làm công ăn lương có việc làm có năng suất, thay đổi theo quý (%)",
        font: {
          size: 18,
        },
        color: "#0400ff",
      },
      datalabels: {
        color: "black",
        formatter: function (values, context) {
          // Lấy giá trị từ mảng data
          const dataValue = context.dataset.data[context.dataIndex];
          // Lấy giá trị ở đầu cột (số đầu tiên trong mảng)
          const firstValue = dataValue[0];
          // Lấy giá trị ở đầu kia cột (số thứ hai trong mảng)
          const secondValue = dataValue[1];
          // Trả về cả hai giá trị, cách nhau bằng dấu cách
          return `${firstValue} -> ${secondValue}`;
        },
        anchor: "center",
        align: "center",
      },
    },
  };
  return (
    <div>
      <Bar data={data} plugins={[ChartDataLabels]} options={options} />
    </div>
  );
};

export default ChartHori;
