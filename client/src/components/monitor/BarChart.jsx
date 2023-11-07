import React from "react";

// Load Highcharts modules
// Import Highcharts
import Highcharts from "highcharts";
import HCMore from "highcharts/highcharts-more";
import Chart from "components/chart/Chart";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);
const BarChart = ({
  seriesData,
  textTitle,
  titleYAxis,
  listCategoriesXAxis,
}) => {
  const transformedData = listCategoriesXAxis.map((category, index) => {
    const entry = {
      name: category,
    };

    seriesData.forEach((series) => {
      entry[series.name] = series.data[index];
    });

    return entry;
  });

  // console.log(transformedData);
  const options = {
    chart: {
      type: "column",
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
    xAxis: {
      categories: listCategoriesXAxis,
      labels: {
        style: {
          fontSize: "14px",
          fontFamily: "auto",
        },
      },
    },
    yAxis: {
      title: {
        text: `${titleYAxis}`,
      },
      tickInterval: 250,
    },

    colors: ["#ff5100", "#ffe432f6"],
    series: seriesData,
  };
  const linkUrl =
    "https://tsddbwptfwiyathksqae.supabase.co/storage/v1/object/public/images/loops.docx";

  // console.log("seriesData: ", seriesData);
  // console.log("listCategoriesXAxis: ", listCategoriesXAxis);
  // seriesData.data.map((item, idx) => {
  //   console.log("item: ", item);
  //   console.log(listCategoriesXAxis[idx]);
  // });
  // console.log('');
  const data = [];
  seriesData.map((item, idx) => {
    // console.log("item: ", item);
    item.data.map((itemChild, index) => {
      // console.log(itemChild);
      const values = {
        name: listCategoriesXAxis[index],
        value: itemChild,
      };
      data.push(values);
      // console.log("item child: ", itemChild);
      // console.log("listCategoriesXAxis: ", listCategoriesXAxis[index]);
    });
  });
  // console.log("data: ", data);
  return (
    <>
      {/* <ReactHighcharts config={config} />; */}
      {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}

      <Chart options={options} linkUrl={linkUrl} data={transformedData} />
    </>
  );
};

export default BarChart;
