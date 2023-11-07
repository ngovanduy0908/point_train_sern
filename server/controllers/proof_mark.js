import { db } from "../db.js";
import XlsxTemplate from "xlsx-template";
import fs from "fs";
export const createOrUpdateProofStudent = async (req, res, next) => {
  const maHK = req.params.maHK;
  const { maSv, name_image } = req.body;
  // console.log("values: ", req.body);
  const queryCheckExisProof = `select id from student_proof_mark where maSv = ${maSv} and maHK = '${maHK}'`;
  db.query(queryCheckExisProof, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) {
      // TODO update
      const queryUpdate = `update student_proof_mark set name_img = '${name_image}' where maSv = '${maSv}' and maHK='${maHK}'`;
      db.query(queryUpdate, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Cập nhật minh chứng thành công.");
      });
    } else {
      // TODO insert
      const queryInsert = `insert into student_proof_mark (maSv, maHK, name_img) values ('${maSv}', '${maHK}', '${name_image}')`;
      db.query(queryInsert, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Cập nhật minh chứng thành công.");
      });
      // return console.log("insert");
    }
  });
};

export const getProofStudent = async (req, res, next) => {
  const { maHK, maSv } = req.params;
  // console.log(maHK, maSv);
  const querySelect = `select * from student_proof_mark where maSv = '${maSv}' and maHK = '${maHK}'`;
  db.query(querySelect, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
export const exportFileExcel = (req, res) => {
  // Đọc tệp Excel mẫu từ đường dẫn cục bộ
  const templateData = fs.readFileSync(
    "D:\\Learn ReactJs\\reactjs\\train_me_now\\client\\public\\upload\\2.xlsx"
  );

  // console.log(req.body);
  // Tạo một instance của XlsxTemplate và tải mẫu Excel
  // const template = new XlsxTemplate(templateData);
  // console.log("template: ", template);
  // console.log(req.body);
  // Định nghĩa dữ liệu bạn muốn điền vào mẫu Excel
  const values = {
    tong_so_hn_tt: 50,
    data: req.body,
  };
  console.log("value:", values);

  // Thực hiện việc điền dữ liệu vào mẫu
  // const sheetNumber = 1;
  // template.substitute(sheetNumber, values);

  // // Tạo dữ liệu Excel đã điền
  // const outputData = template.generate();
  // console.log("outputData: ", outputData);
  // // Xác định tên tệp Excel đầu ra
  // const outputFilePath = "output.xlsx";

  // // Ghi tệp Excel đã điền vào đường dẫn trên máy chủ
  // fs.writeFileSync(outputFilePath, outputData, "binary");
};
// Trả về tệp Excel đã tạo cho phía máy khách
// res.setHeader(
//   "Content-Disposition",
//   `attachment; filename=${outputFilePath}`
// );
// res.setHeader(
//   "Content-Type",
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
// );
// res.sendFile(outputFilePath);
// export const exportFileExcel = (req, res) => {
//   fs.readFile(
//     "D:\\Learn ReactJs\\reactjs\\train_me_now\\client\\public\\upload\\Book1.xlsx",
//     function (err, data) {
//       // Create a template
//       var template = new XlsxTemplate(data);
//       // console.log(template);
//       // // Replacements take place on first sheet
//       var sheetNumber = 1;

//       // // Set up some placeholder values matching the placeholders in the template
//       var values = {
//         name: "Duy",
//         age: 20,
//       };

//       // // Perform substitution
//       template.substitute(sheetNumber, values);

//       // // Get binary data
//       var data = template.generate();

//       // ...
//     }
//   );

// };
