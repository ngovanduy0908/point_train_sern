import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { supabase } from "./supabase";
export const generatePdf = (nameFile, dataValue) => {
  return new Promise(async (resolve, reject) => {
    async function loadFile(url, callback) {
      PizZipUtils.getBinaryContent(url, callback);
    }

    try {
      loadFile(
        "https://wxutuelmzidfloowaugx.supabase.co/storage/v1/object/public/files/template_drl%20(2).docx",
        async function (error, content) {
          if (error) {
            reject(error);
            return;
          }
          // console.log("supabase: ", supabase);
          // ... (phần còn lại của mã của bạn)
          var zip = new PizZip(content);
          var doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

          try {
            doc.render({
              ten: "Ngo Van Duy",
              tenLop: "DCCTKH64A",
              hk: "2",
              khoa_hoc: "64",
              msv: "1921050137",
              khoa: "Cong nghe thong tin",
              nam_hoc: "2023-2024",
              ...dataValue,
            });
          } catch (error) {
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
            }
            throw error;
          }

          var out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/pdf",
          });
          // console.log("log out: ", out);
          const file = new File(
            [out],
            `${nameFile}_${new Date().getTime()}.pdf`,
            {
              type: "application/pdf",
            }
          );
          // console.log("out: ", out);
          console.log("file: ", file);
          const { data, errorMsg } = await supabase.storage
            .from("files")
            .upload(`pdf/${Date.now()}.pdf`, file);

          if (errorMsg) {
            console.error("Error uploading file:", errorMsg.message);
          } else {
            console.log("File uploaded successfully:", data);
          }
          // const formData = new FormData();
          // formData.append('file', file);
          // console.log('formData: ', formData);
          // const res = await axios.post(`http://giamngheo.bkt.net.vn/file/upload`, formData);
          // Sau khi hoàn thành xử lý tạo tài liệu và gửi tệp lên server
          // const filePath = res.data.file_path;
          // console.log('filePath: ', filePath);
          // resolve({ filePath, name: file.name });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
