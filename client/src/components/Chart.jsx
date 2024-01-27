import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);

const Chart = ({ options }) => {
  return (
    <div className="h-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
