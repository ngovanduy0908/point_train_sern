import { db } from "../db.js";

export const getCitizenMediumByMaSv = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maSv = req.params.maSv;
  const maHK = req.params.maHK;
  const q = `
    SELECT 
    point_citizen.point, point_medium.point_average 
    FROM 
    students 
    left JOIN point_citizen on students.maSv = point_citizen.maSv 
    left JOIN point_medium on students.maSv = point_medium.maSv 
    where 
    students.maSv = '${maSv}' and 
    point_medium.maHK = '${maHK}' and
    point_citizen.maHK = '${maHK}'
    `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const getPointStudentByMa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maHK = req.params.maHK;
  const maSv = req.params.maSv;

  const q = `select * from point_student where maHK='${maHK}' and maSv='${maSv}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const insertOrUpdatePointStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maSv = req.params.maSv;
  const maHK = req.params.maHK;
  const values = req.body;
  console.log("here: ", req.body);
  const checkExisPointStudent = `select maSv from point_student where maSv = '${maSv}' and maHK = '${maHK}'`;
  db.query(checkExisPointStudent, (err, data) => {
    if (err) return res.status(500).json(err);

    // const values = req.body;

    if (data.length) {
      const q = `
      update point_student set
                            svDiemTBHK = '${values.svDiemTBHK}',
                            svNCKH1  = '${values.svNCKH1}',
                            svNCKH2 = '${values.svNCKH2}',
                            svNCKH3 = '${values.svNCKH3}',
                            svOlympic1 = '${values.svOlympic1}',
                            svOlympic2 = '${values.svOlympic2}',
                            svOlympic3 = '${values.svOlympic3}',
                            svOlympic4 = '${values.svOlympic4}',
                            svNoRegulation = '${values.svNoRegulation}',
                            svOnTime = '${values.svOnTime}',
                            svAbandon = '${values.svAbandon}',
                            svUnTrueTime = '${values.svUnTrueTime}',
                            svRightRule = '${values.svRightRule}',
                            svCitizen = '${values.svCitizen}',
                            svNoFullStudy = '${values.svNoFullStudy}',
                            svNoCard = '${values.svNoCard}',
                            svNoAtivities = '${values.svNoAtivities}',
                            svNoPayFee = '${values.svNoPayFee}',
                            svFullActive = '${values.svFullActive}',
                            svAchievementSchool = '${values.svAchievementSchool}',
                            svAchievementCity = '${values.svAchievementCity}',
                            svAdvise = '${values.svAdvise}',
                            svIrresponsible = '${values.svIrresponsible}',
                            svNoCultural = '${values.svNoCultural}',
                            svPositiveStudy = '${values.svPositiveStudy}',
                            svPositiveLove = '${values.svPositiveLove}',
                            svWarn = '${values.svWarn}',
                            svNoProtect = '${values.svNoProtect}',
                            svMonitor = '${values.svMonitor}',
                            svBonus = '${values.svBonus}',
                            svIrresponsibleMonitor = '${values.svIrresponsibleMonitor}'
                            where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q1 = `update point set point_student = '${values.sum}' where maSv = '${maSv}' and maHK = '${maHK}'`;
      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        db.query(q1, (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Sinh viên cập nhật điểm thành công");
        });
      });
    } else {
      const q = `
      INSERT INTO point_student 
                                (maSv, 
                                svDiemTBHK, 
                                svCitizen, 
                                svMonitor, 
                                svNCKH1, 
                                svNCKH2, 
                                svNCKH3, 
                                svOlympic1, 
                                svOlympic2, 
                                svOlympic3, 
                                svOlympic4, 
                                svNoRegulation, 
                                svOnTime, 
                                svAbandon, 
                                svUnTrueTime, 
                                svNoFullStudy, 
                                svNoCard, 
                                svNoAtivities, 
                                svNoPayFee, 
                                svFullActive, 
                                svAchievementSchool, 
                                svAchievementCity, 
                                svAdvise, 
                                svIrresponsible, 
                                svNoCultural, 
                                svPositiveStudy, 
                                svPositiveLove, 
                                svWarn, 
                                svNoProtect, 
                                svBonus, 
                                svIrresponsibleMonitor, 
                                maHK, 
                                svRightRule)
                            VALUES 
                                ('${maSv}', 
                                '${values.svDiemTBHK}', 
                                '${values.svCitizen}', 
                                '${values.svMonitor}', 
                                '${values.svNCKH1}', 
                                '${values.svNCKH2}', 
                                '${values.svNCKH3}', 
                                '${values.svOlympic1}', 
                                '${values.svOlympic2}', 
                                '${values.svOlympic3}', 
                                '${values.svOlympic4}', 
                                '${values.svNoRegulation}', 
                                '${values.svOnTime}', 
                                '${values.svAbandon}', 
                                '${values.svUnTrueTime}', 
                                '${values.svNoFullStudy}', 
                                '${values.svNoCard}', 
                                '${values.svNoAtivities}', 
                                '${values.svNoPayFee}', 
                                '${values.svFullActive}', 
                                '${values.svAchievementSchool}', 
                                '${values.svAchievementCity}', 
                                '${values.svAdvise}', 
                                '${values.svIrresponsible}', 
                                '${values.svNoCultural}', 
                                '${values.svPositiveStudy}', 
                                '${values.svPositiveLove}', 
                                '${values.svWarn}', 
                                '${values.svNoProtect}', 
                                '${values.svBonus}', 
                                '${values.svIrresponsibleMonitor}', 
                                '${maHK}', 
                                '${values.svRightRule}')`;
      const q1 = `
        INSERT INTO point (maSv, maHK, point_student) values ('${maSv}', '${maHK}', '${values.sum}')
        `;
      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        db.query(q1, (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Sinh Vien Nhap Diem Thanh Cong");
        });
      });
    }
  });
};
