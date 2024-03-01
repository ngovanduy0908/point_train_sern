import * as path from "path";
import * as fs from "fs";
import XlsxTemplate from "xlsx-template";

const __dirname = path.resolve();
import { db } from "../db.js";
export function convertToUpperCase(inputString) {
  return inputString.toUpperCase();
}
export const getAllListDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const q = "select * from department";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getNameDepartmentByMa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maKhoa } = req.params;
  console.log("maKhoa: ", maKhoa);
  const q = `
  SELECT 
  name as 'tenKhoa'
  FROM 
  department
  WHERE 
  maKhoa = '${maKhoa}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const addDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const newData = req.body;
  const maKhoa = newData.maKhoa;
  const q = "select maKhoa from department where maKhoa=?";
  db.query(q, [maKhoa], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json("Khoa đã tồn tại");

    const q =
      "insert into department(maKhoa, name, account, password) values(?)";

    const values = [
      req.body.maKhoa,
      req.body.name,
      req.body.account,
      req.body.password,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Tạo khoa thành công");
    });
  });
};

export const editDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maKhoa = req.params.maKhoa;
  const updatedData = req.body;
  const q = `update department set maKhoa='${updatedData.maKhoa}', name='${updatedData.name}', account='${updatedData.account}', password='${updatedData.password}' where maKhoa='${maKhoa}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deleteDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maKhoa = req.params.maKhoa;

  const q = `delete from department where maKhoa = ${maKhoa}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const statisticalDepartment = (req, res) => {
  const { maKhoa } = req.query;

  const q = `
  SELECT 
  COUNT(DISTINCT teacher.maGV) as 'tongGV', 
  COUNT(DISTINCT class.maLop) as 'tongLop', 
  COUNT(DISTINCT students.maSv) as 'tongSV' 
FROM 
  department
LEFT JOIN 
  teacher ON department.maKhoa = teacher.maKhoa
LEFT JOIN 
  class ON teacher.maGv = class.maGv
LEFT JOIN 
  students ON class.maLop = students.maLop
WHERE 
  department.maKhoa = '${maKhoa}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const getCountManyAdmin = (req, res) => {
  const q = `
  SELECT
  COUNT(DISTINCT department.maKhoa) AS tongKhoa,
  COUNT(DISTINCT course.maKhoaHoc) AS tongKhoaHoc,
  COUNT(DISTINCT teacher.maGV) AS tongGV,
  COUNT(DISTINCT class.maLop) AS tongLop,
  COUNT(DISTINCT students.maSv) AS tongSV
FROM
  department
LEFT JOIN teacher ON department.maKhoa = teacher.maKhoa
LEFT JOIN class ON teacher.maGv = class.maGv
LEFT JOIN course ON (class.maKhoaHoc = course.maKhoaHoc OR class.maKhoaHoc IS NULL)
LEFT JOIN students ON class.maLop = students.maLop
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const viewExcelBC = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  // console.log("req: ", req.body);
  const {
    maLop,
    maHK,
    danhSachSV,
    tenGV,
    tenKhoa,
    tenLopTruong,
    maCN,
    maKhoaHoc,
    isClass,
  } = req.body;
  // console.log("body: ", maKhoaHoc);
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để đổi về đúng tháng
  const year = currentDate.getFullYear();
  // let q;
  if (isClass) {
    // console.log("trng nay: ", req.body);
    const q = `
    select 
  students.name,
  students.maSv, 
  students.phone_number as "phone",
  point.gvNote,
  semester.name as "tenHK", 
  point_teacher.gvDiemTBHK + point_teacher.gvNCKH1 + point_teacher.gvNCKH2 + point_teacher.gvNCKH3 + point_teacher.gvOlympic1 + point_teacher.gvOlympic2 + point_teacher.gvOlympic3 + point_teacher.gvOlympic4 + point_teacher.gvNoRegulation + point_teacher.gvOnTime + point_teacher.gvAbandon + point_teacher.gvUnTrueTime as 'sum1', 
  point_teacher.gvRightRule + point_teacher.gvCitizen + point_teacher.gvNoFullStudy + point_teacher.gvNoCard + point_teacher.gvNoAtivities + point_teacher.gvNoPayFee as 'sum2',
  point_teacher.gvFullActive + point_teacher.gvAchievementSchool + point_teacher.gvAchievementCity + point_teacher.gvAdvise + point_teacher.gvIrresponsible + point_teacher.gvNoCultural as 'sum3',
  point_teacher.gvPositiveStudy + point_teacher.gvPositiveLove + point_teacher.gvWarn + point_teacher.gvNoProtect as 'sum4',
  point_teacher.gvMonitor + point_teacher.gvBonus + point_teacher.gvIrresponsibleMonitor as 'sum5',
  role.name as role_name 
  from 
  students, 
  semester, 
  point, 
  point_teacher, 
  role
  where 
  students.maSv = point.maSv and 
  students.role_id = role.id and 
  point.maHK = semester.maHK and 
  point_teacher.maSv = point.maSv and 
  students.maLop = '${maLop.maLop}' and 
  semester.maHK = '${maHK.maHK}' and 
  point.maHK = '${maHK.maHK}' and 
  point_teacher.maHK = '${maHK.maHK}' and 
  point.point_teacher >= '${danhSachSV.min}' and point.point_teacher <= '${danhSachSV.max}' and
  point.status_teacher = 1`;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      const handleData = data?.map((item, idx) => ({
        ...item,
        sum: item.sum1 + item.sum2 + item.sum3 + item.sum4 + item.sum5,
        ki_luat: 0,
        stt: idx + 1,
      }));
      const values = {
        dssv: handleData,
        title: danhSachSV.title,
        hk: maHK ? convertToUpperCase(maHK?.tenHK) : "",
        tenKhoa: convertToUpperCase(tenKhoa),
        tenVaKhoa: `LỚP: ${convertToUpperCase(
          maLop.tenLop
        )} KHOA: ${convertToUpperCase(tenKhoa)}`,
        tenLopTruong: tenLopTruong ? tenLopTruong : "",
        day: day,
        month: month,
        year: year,
      };
      // console.log("value: ", values);
      const templateDataPath = path.join(
        __dirname,
        "./public/uploads",
        "export_gv.xlsx"
      );
      const templateData = fs.readFileSync(templateDataPath);
      const template = new XlsxTemplate(templateData);
      const sheetNumber = 1;

      template.substitute(sheetNumber, values);
      // template.sheets[sheetNumber - 1].name = values.tenSheet;

      const outputData = template.generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });
      // console.log("return: ", outputData);
      const resultData = {
        data: values,
        dataBuffer: outputData,
      };
      return res.status(200).json(resultData);
    });
  } else {
    const q = `
    select 
    students.name,
    students.maSv, 
    students.phone_number as "phone",
    point.gvNote,
    semester.name as "tenHK", 
    class.maLop as "tenLop",
    point_teacher.gvDiemTBHK + point_teacher.gvNCKH1 + point_teacher.gvNCKH2 + point_teacher.gvNCKH3 + point_teacher.gvOlympic1 + point_teacher.gvOlympic2 + point_teacher.gvOlympic3 + point_teacher.gvOlympic4 + point_teacher.gvNoRegulation + point_teacher.gvOnTime + point_teacher.gvAbandon + point_teacher.gvUnTrueTime as 'sum1', 
    point_teacher.gvRightRule + point_teacher.gvCitizen + point_teacher.gvNoFullStudy + point_teacher.gvNoCard + point_teacher.gvNoAtivities + point_teacher.gvNoPayFee as 'sum2',
    point_teacher.gvFullActive + point_teacher.gvAchievementSchool + point_teacher.gvAchievementCity + point_teacher.gvAdvise + point_teacher.gvIrresponsible + point_teacher.gvNoCultural as 'sum3',
    point_teacher.gvPositiveStudy + point_teacher.gvPositiveLove + point_teacher.gvWarn + point_teacher.gvNoProtect as 'sum4',
    point_teacher.gvMonitor + point_teacher.gvBonus + point_teacher.gvIrresponsibleMonitor as 'sum5',
    role.name as role_name 
    from 
    students, 
    semester, 
    point, 
    point_teacher, 
    role,
    class
    where 
    students.maSv = point.maSv and 
    students.role_id = role.id and 
    students.maLop = class.maLop and
    point.maHK = semester.maHK and 
    point_teacher.maSv = point.maSv and 
    semester.maHK = '${maHK.maHK}' and 
    class.maCN = '${maCN.maCN}' and
    class.maKhoaHoc = '${maKhoaHoc.maKhoaHoc}' and
    point.maHK = '${maHK.maHK}' and 
    point_teacher.maHK = '${maHK.maHK}' and 
    point.point_teacher >= '${danhSachSV.min}' and point.point_teacher <= '${danhSachSV.max}' and
    point.status_teacher = 1
    `;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      const handleData = data?.map((item, idx) => ({
        ...item,
        sum: item.sum1 + item.sum2 + item.sum3 + item.sum4 + item.sum5,
        ki_luat: 0,
        stt: idx + 1,
      }));
      const values = {
        dssv: handleData,
        title: danhSachSV.title,
        hk: maHK ? convertToUpperCase(maHK?.tenHK) : "",
        tenKhoa: convertToUpperCase(tenKhoa),
        tenVaKhoa: `${convertToUpperCase(
          maCN?.tenCN
        )} - KHOA: ${convertToUpperCase(tenKhoa)} - ${convertToUpperCase(
          maKhoaHoc?.tenKhoaHoc
        )}`,
        tenLopTruong: tenLopTruong ? tenLopTruong : "",
        day: day,
        month: month,
        year: year,
      };
      // console.log("value: ", values);
      const templateDataPath = path.join(
        __dirname,
        "./public/uploads",
        "export_cn.xlsx"
      );
      const templateData = fs.readFileSync(templateDataPath);
      const template = new XlsxTemplate(templateData);
      const sheetNumber = 1;

      template.substitute(sheetNumber, values);
      // template.sheets[sheetNumber - 1].name = values.tenSheet;

      const outputData = template.generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });
      // console.log("return: ", outputData);
      const resultData = {
        data: values,
        dataBuffer: outputData,
      };
      return res.status(200).json(resultData);
    });
  }
};
