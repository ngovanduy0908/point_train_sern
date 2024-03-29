import React, { useEffect } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const GenerateDocument = ({ linkUrl, dataValue }) => {
  console.log("datavalue: ", dataValue);
  const generateDocument = () => {
    loadFile(linkUrl, function (error, content) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      // doc.setData({
      //   data: dataValue,
      // });
      try {
        // render the document (replace all occurrences of {first_name} by John, {last_name} by Doe, ...)
        doc.render({
          title: "Default title",
          products: [
            {
              title: "Duk",
              name: "DukSoftware",
              reference: "DS0",
            },
            {
              title: "Tingerloo",
              name: "Tingerlee",
              reference: "T00",
            },
          ],
        });
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }); //Output the document using Data-URI
      saveAs(out, "output.docx");
    });
  };

  return (
    <div className="p-2">
      <button onClick={generateDocument}>Xuất file word theo mẫu</button>
    </div>
  );
};

export default GenerateDocument;
