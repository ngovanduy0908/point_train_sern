import React from "react";
import "chart.js/auto";
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

import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);
const RadarChart = () => {
  const data = {
    labels: [
      "Trình độ giáo dục người lớn",
      "Tình trạng đi học trẻ em",
      "Tiếp cận dịch vụ y tế",
      "Bảo hiểm y tế",
      "Chất lượng ở nhà",
      "Diện tích nhà ở",
      "Nguồn nước sinh hoạt",
      "Nhà tiêu hợp vệ sinh",
      "Sử dụng dịch vụ viễn thông",
      "Tài sản tiếp cận thông tin",
    ],
    datasets: [
      {
        label: "Đồng bằng sông Hồng",
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        borderColor: "#065e5e",
        backgroundColor: "transparent",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Bắc Trung Bộ và miền Trung",
        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: "transparent",
        borderColor: "#80ea4e",
        pointBackgroundColor: "#4e8a1f",
      },
      {
        label: "Đông Nam Bộ",
        data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        backgroundColor: "transparent",

        borderColor: "#1ea8aa",
        pointBackgroundColor: "#093447",
      },
      {
        label: "Trung du và miền núi phía Bắc",
        data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        backgroundColor: "transparent",

        borderColor: "#7c1010",
        pointBackgroundColor: "#bb415bba",
      },
      {
        label: "Tây Nguyên",
        data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
        backgroundColor: "transparent",
        borderColor: "#3a6fbe",
        pointBackgroundColor: "#4c47e5b9",
      },
      {
        label: "Đồng bằng sông Cửu Long",
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        backgroundColor: "transparent",
        borderColor: "#f6733f",
        pointBackgroundColor: "#df620fb8",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true, // Hiển thị tiêu đề
        text: "Tỉ lệ người nghèo đa chiều, theo các chỉ số thiếu hụt và vùng địa lý, năm 2020(%)",
        position: "top", // Nội dung tiêu đề
        font: {
          size: 18,
        },
        color: "#0400ff",
      },
      legend: {
        display: true,
        position: "bottom", // Đặt vị trí chú thích ở phía dưới
        align: "start",
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
          },
          color: "#000",
        },
      },
    },

    scales: {
      r: {
        pointLabels: {
          font: {
            size: 14,
          },
        },
        angleLines: {
          display: true,
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toFixed(1);
          },
          font: {
            size: 14, // Font-size cho các giá trị trục dọc
          },
          z: 1,
        },
      },
    },
  };
  // data.datasets.forEach((dataset) => {
  //   dataset.pointRadius = 0;
  // });
  return (
    <div>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
