import Chart from "components/Chart";

const StackChart = ({ data, yTitle, xAxis, title }) => {
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
    },
    yAxis: {
      min: 0,
      title: {
        text: yTitle,
      },
      stackLabels: {
        enabled: true,
      },
    },

    plotOptions: {
      column: {
        stacking: "normal",
        pointWidth: 30,
      },
    },
    series: data,
  };
  return (
    <div>
      <Chart options={options} />
    </div>
  );
};

export default StackChart;
