import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GenerateDocument from "components/monitor/GenerateDocument ";
import GenerateExcel from "components/monitor/GenerateExcel";
// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
HCMore(Highcharts);

const Chart = ({ options, linkUrl, data }) => {
  const { series, ...values } = options;
  const optionsString = JSON.stringify(options);
  //   console.log(optionsString);
  const encodedOptionsString = encodeURIComponent(optionsString);

  return (
    <div>
      <CopyToClipboard
        text={`${window.location.origin}/chart/detail?data=${encodedOptionsString}`}
        onCopy={() => console.log("Đã sao chép link!")}
      >
        <button>Chia sẻ link chart online</button>
      </CopyToClipboard>
      <GenerateDocument linkUrl={linkUrl} dataValue={data} />
      <GenerateExcel dataValue={data} />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
