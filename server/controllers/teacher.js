import * as path from "path";
import * as fs from "fs";
import XlsxTemplate from "xlsx-template";

const __dirname = path.resolve();
import { db } from "../db.js";

export function convertToUpperCase(inputString) {
  return inputString.toUpperCase();
}

export const getAllListTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maKhoa = req.params.maKhoa;
  const q =
    'SELECT teacher.*, department.name as "department_name" FROM `teacher`, department WHERE teacher.maKhoa = department.maKhoa and teacher.maKhoa = ?';
  db.query(q, [maKhoa], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maKhoa = req.params.maKhoa;
  const newData = req.body;
  const maGv = newData.maGv;
  const q = "select maGv from teacher where maGv=?";
  db.query(q, [maGv], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json("Mã giáo viên đã tồn tại");

    const q = "insert into teacher(maGv, name, maKhoa) values(?)";

    const values = [req.body.maGv, req.body.name, maKhoa];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Them giao vien thanh cong");
    });
  });
};

export const editTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const { maKhoa, maGv } = req.params;
  const updatedData = req.body;
  const q = `update teacher set maGv='${updatedData.maGv}', name='${updatedData.name}', email='${updatedData.email}', password='${updatedData.password}' where maGv='${maGv}' and maKhoa='${maKhoa}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(409).json(err);
    return res.status(200).json(data);
  });
};

export const deleteTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maGv = req.params.maGv;
  const maKhoa = req.params.maKhoa;
  const q = `delete from teacher where maGv = ? and maKhoa = ?`;
  db.query(q, [maGv, maKhoa], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const viewExcelBC = async (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not authenticated");
  // console.log("req: ", req.body);
  const { maLop, maHK, danhSachSV, tenGV, tenKhoa, tenLopTruong } = req.body;
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để đổi về đúng tháng
  const year = currentDate.getFullYear();
  const q = `
  select 
  students.name,
  students.maSv, 
  students.phone_number as "phone",
  point.gvNote,
  semester.name as "tenHK", 
  students.maLop as "tenLop",
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
      tenLop: convertToUpperCase(maLop.tenLop),
      hk: convertToUpperCase(maHK.tenHK),
      tenGV: tenGV,
      tenKhoa: convertToUpperCase(tenKhoa),
      tenVaKhoa: `LỚP: ${convertToUpperCase(
        maLop.tenLop
      )} - KHOA: ${convertToUpperCase(tenKhoa)}`,
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
    // console.log("tra ra object vay: ", values);
    const resultData = {
      data: values,
      dataBuffer: outputData,
    };
    return res.status(200).json(resultData);
  });
};
