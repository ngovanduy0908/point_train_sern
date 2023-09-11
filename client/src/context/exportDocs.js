import React from "react";

const ExportToDocx = ({ htmlContent }) => {
  const handleExport = () => {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + htmlContent + postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, "document.doc");
    } else {
      downloadLink.href = url;
      downloadLink.download = "document.doc";
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  };

  return <button onClick={handleExport}>Export to .doc</button>;
};

export default ExportToDocx;
