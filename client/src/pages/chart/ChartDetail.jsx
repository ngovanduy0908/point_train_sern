import React from "react";
import { useLocation } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);

const ChartDetail = () => {
  // const { state } = useLocation();
  // console.log("state: ", state);
  //
  // const storedOptions = JSON.parse(localStorage.getItem("chartOptions"));
  //call api thì làm sao lấy được hết các config ???
  //  chỉ lấy được data thôi chứ
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const decodedOptions = JSON.parse(query.get("data"));
  const encodedOptionsString = query.get("data");
  const optionsString = decodeURIComponent(encodedOptionsString);
  console.log("encodedOptionsString: ", encodedOptionsString);
  console.log("optionsString: ", optionsString);
  const decodedOptions = JSON.parse(optionsString);

  console.log("decodedOptions: ", decodedOptions);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={decodedOptions} />
    </div>
  );
};

export default ChartDetail;
