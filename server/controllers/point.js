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

export const getPointMonitorByMa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.query.maHK;
  const maSv = req.query.maSv;
  const q = `select * from point_monitor where maHK='${maHK}' and maSv='${maSv}'`;
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
  // console.log("here: ", req.body);
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

export const insertOrUpdatePointStudentMonitor = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  // console.log("xuong day: ", req.body);
  const maSv = req.query.maSv;
  const maHK = req.query.maHK;
  const values = req.body;
  // console.log("values.ltDiemTBHK: ", values.ltDiemTBHK);
  const checkExisPointMonitor = `select maSv from point_monitor where maSv = '${maSv}' and maHK = '${maHK}'`;
  db.query(checkExisPointMonitor, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const q = `
      update point_monitor set
                            ltDiemTBHK = '${values.ltDiemTBHK}',
                            ltNCKH1  = '${values.ltNCKH1}',
                            ltNCKH2 = '${values.ltNCKH2}',
                            ltNCKH3 = '${values.ltNCKH3}',
                            ltOlympic1 = '${values.ltOlympic1}',
                            ltOlympic2 = '${values.ltOlympic2}',
                            ltOlympic3 = '${values.ltOlympic3}',
                            ltOlympic4 = '${values.ltOlympic4}',
                            ltNoRegulation = '${values.ltNoRegulation}',
                            ltOnTime = '${values.ltOnTime}',
                            ltAbandon = '${values.ltAbandon}',
                            ltUnTrueTime = '${values.ltUnTrueTime}',
                            ltRightRule = '${values.ltRightRule}',
                            ltCitizen = '${values.ltCitizen}',
                            ltNoFullStudy = '${values.ltNoFullStudy}',
                            ltNoCard = '${values.ltNoCard}',
                            ltNoAtivities = '${values.ltNoAtivities}',
                            ltNoPayFee = '${values.ltNoPayFee}',
                            ltFullActive = '${values.ltFullActive}',
                            ltAchievementSchool = '${values.ltAchievementSchool}',
                            ltAchievementCity = '${values.ltAchievementCity}',
                            ltAdvise = '${values.ltAdvise}',
                            ltIrresponsible = '${values.ltIrresponsible}',
                            ltNoCultural = '${values.ltNoCultural}',
                            ltPositiveStudy = '${values.ltPositiveStudy}',
                            ltPositiveLove = '${values.ltPositiveLove}',
                            ltWarn = '${values.ltWarn}',
                            ltNoProtect = '${values.ltNoProtect}',
                            ltMonitor = '${values.ltMonitor}',
                            ltBonus = '${values.ltBonus}',
                            ltIrresponsibleMonitor = '${values.ltIrresponsibleMonitor}'
                            where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q1 = `update point set point_monitor = '${values.sum}', status = 1 where maSv = '${maSv}' and maHK = '${maHK}'`;
      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        db.query(q1, (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Lớp trưởng cập nhật điểm thành công");
        });
      });
    } else {
      // console.log("vao day nua");
      const q = `
      INSERT INTO point_monitor 
                                (maSv, 
                                ltDiemTBHK, 
                                ltCitizen, 
                                ltMonitor, 
                                ltNCKH1, 
                                ltNCKH2, 
                                ltNCKH3, 
                                ltOlympic1, 
                                ltOlympic2, 
                                ltOlympic3, 
                                ltOlympic4, 
                                ltNoRegulation, 
                                ltOnTime, 
                                ltAbandon, 
                                ltUnTrueTime, 
                                ltNoFullStudy, 
                                ltNoCard, 
                                ltNoAtivities, 
                                ltNoPayFee, 
                                ltFullActive, 
                                ltAchievementSchool, 
                                ltAchievementCity, 
                                ltAdvise, 
                                ltIrresponsible, 
                                ltNoCultural, 
                                ltPositiveStudy, 
                                ltPositiveLove, 
                                ltWarn, 
                                ltNoProtect, 
                                ltBonus, 
                                ltIrresponsibleMonitor, 
                                maHK, 
                                ltRightRule)
                            VALUES 
                                ('${maSv}', 
                                '${values.ltDiemTBHK}', 
                                '${values.ltCitizen}', 
                                '${values.ltMonitor}', 
                                '${values.ltNCKH1}', 
                                '${values.ltNCKH2}', 
                                '${values.ltNCKH3}', 
                                '${values.ltOlympic1}', 
                                '${values.ltOlympic2}', 
                                '${values.ltOlympic3}', 
                                '${values.ltOlympic4}', 
                                '${values.ltNoRegulation}', 
                                '${values.ltOnTime}', 
                                '${values.ltAbandon}', 
                                '${values.ltUnTrueTime}', 
                                '${values.ltNoFullStudy}', 
                                '${values.ltNoCard}', 
                                '${values.ltNoAtivities}', 
                                '${values.ltNoPayFee}', 
                                '${values.ltFullActive}', 
                                '${values.ltAchievementSchool}', 
                                '${values.ltAchievementCity}', 
                                '${values.ltAdvise}', 
                                '${values.ltIrresponsible}', 
                                '${values.ltNoCultural}', 
                                '${values.ltPositiveStudy}', 
                                '${values.ltPositiveLove}', 
                                '${values.ltWarn}', 
                                '${values.ltNoProtect}', 
                                '${values.ltBonus}', 
                                '${values.ltIrresponsibleMonitor}', 
                                '${maHK}', 
                                '${values.ltRightRule}')`;
      const q1 = `update point set point_monitor = '${values.sum}', status = 1 where maSv = '${maSv}' and maHK = '${maHK}'`;

      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        db.query(q1, (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Lớp trưởng duyệt thành công");
        });
      });
    }
  });
};

export const getPointStudentByMaLopAndMaHK = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.query.maHK;
  const maLop = req.query.maLop;
  const query = `select students.*, point.* from students, point where students.maSv = point.maSv and maHK='${maHK}' and maLop='${maLop}'`;
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getPointStudentNoMark = (req, res) => {
  // console.log("vao day");
  // console.log("req: ", req.query);
  const maLop = req.query.maLop;
  const maHK = req.query.maHK;
  const query = `SELECT * 
  from 
  students 
  where 
  maLop = '${maLop}' 
  AND 
  maSv 
  not in 
      (SELECT (students.maSv) 
      from students 
      LEFT JOIN 
      point 
      on students.maSv = point.maSv 
      LEFT JOIN 
      semester 
      on point.maHK = semester.maHK 
      WHERE 
      students.maLop = '${maLop}' 
      and point.maHK = '${maHK}')`;
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const markZero = (req, res) => {
  // console.log("vao day: ", req.body);
  const danhSachSinhVienNoMark = req.body;
  danhSachSinhVienNoMark.forEach((element) => {
    // console.log("vao day: ", element.maSv);
    const maSv = element.maSv;
    const maHK = element.maHK;

    const sql_point = `insert into point
                      (maSv, maHK, status, status_teacher, point_student, point_monitor, point_teacher)
                      values
                      ('${maSv}', '${maHK}', 1, 1, 0, 0, 0)`;

    const sql_point_student = `insert into point_student (maSv, maHK) values('${maSv}', '${maHK}')`;
    const sql_point_monitor = `insert into point_monitor (maSv, maHK) values('${maSv}', '${maHK}')`;
    const sql_point_teacher = `insert into point_teacher (maSv, maHK) values('${maSv}', '${maHK}')`;
    db.query(sql_point, (err, data) => {
      if (err) return res.status(500).json(err);
    });
    db.query(sql_point_student, (err, data) => {
      if (err) return res.status(500).json(err);
    });
    db.query(sql_point_monitor, (err, data) => {
      if (err) return res.status(500).json(err);
    });
    db.query(sql_point_teacher, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
  return res.status(200).json("Thành Công");
};

export const getPointStudentTeacherByMaLopAndMaHK = (req, res) => {
  // console.log("xuong day: ", req.query);
  const maLop = req.query.maLop;
  const maHK = req.query.maHK;
  const q = `select students.*, point.*
  from 
  students, point
  where 
  students.maSv = point.maSv 
  and point.maHK = '${maHK}' 
  and point.status = '1' 
  and students.maLop = '${maLop}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPointTeacherByMa = (req, res) => {
  const maHK = req.query.maHK;
  const maSv = req.query.maSv;
  const q = `select * from point_teacher where maHK='${maHK}' and maSv='${maSv}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const insertOrUpdatePointTeacher = async (req, res) => {
  const { maHK, maSv } = req.query;
  // console.log("mahk va masv: ", maHK, maSv);
  const values = req.body;
  // console.log("value: ", values.note);

  const checkExisPointTeacher = `select maSv from point_teacher where maSv = '${maSv}' and maHK = '${maHK}'`;
  db.query(checkExisPointTeacher, async (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log("data: ", data);
    const gvNote = values.note ? values.note : "";
    // console.log("gv note: ", gvNote);
    if (data.length) {
      const q = `
      update point_teacher set
                            gvDiemTBHK = '${values.gvDiemTBHK}',
                            gvNCKH1  = '${values.gvNCKH1}',
                            gvNCKH2 = '${values.gvNCKH2}',
                            gvNCKH3 = '${values.gvNCKH3}',
                            gvOlympic1 = '${values.gvOlympic1}',
                            gvOlympic2 = '${values.gvOlympic2}',
                            gvOlympic3 = '${values.gvOlympic3}',
                            gvOlympic4 = '${values.gvOlympic4}',
                            gvNoRegulation = '${values.gvNoRegulation}',
                            gvOnTime = '${values.gvOnTime}',
                            gvAbandon = '${values.gvAbandon}',
                            gvUnTrueTime = '${values.gvUnTrueTime}',
                            gvRightRule = '${values.gvRightRule}',
                            gvCitizen = '${values.gvCitizen}',
                            gvNoFullStudy = '${values.gvNoFullStudy}',
                            gvNoCard = '${values.gvNoCard}',
                            gvNoAtivities = '${values.gvNoAtivities}',
                            gvNoPayFee = '${values.gvNoPayFee}',
                            gvFullActive = '${values.gvFullActive}',
                            gvAchievementSchool = '${values.gvAchievementSchool}',
                            gvAchievementCity = '${values.gvAchievementCity}',
                            gvAdvise = '${values.gvAdvise}',
                            gvIrresponsible = '${values.gvIrresponsible}',
                            gvNoCultural = '${values.gvNoCultural}',
                            gvPositiveStudy = '${values.gvPositiveStudy}',
                            gvPositiveLove = '${values.gvPositiveLove}',
                            gvWarn = '${values.gvWarn}',
                            gvNoProtect = '${values.gvNoProtect}',
                            gvMonitor = '${values.gvMonitor}',
                            gvBonus = '${values.gvBonus}',
                            gvIrresponsibleMonitor = '${values.gvIrresponsibleMonitor}'
                            where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q1 = `update point set 
      point_teacher = '${values.sum}', 
      point_monitor = '${values.sum}', 
      gvNote='${values.note ? values?.note : ""}', 
      status_teacher = 1, 
      status_admin = ${values?.status_admin === 1 ? 1 : 0} 
      where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q2 = `
      update point_monitor set
                            ltDiemTBHK = '${values.gvDiemTBHK}',
                            ltNCKH1  = '${values.gvNCKH1}',
                            ltNCKH2 = '${values.gvNCKH2}',
                            ltNCKH3 = '${values.gvNCKH3}',
                            ltOlympic1 = '${values.gvOlympic1}',
                            ltOlympic2 = '${values.gvOlympic2}',
                            ltOlympic3 = '${values.gvOlympic3}',
                            ltOlympic4 = '${values.gvOlympic4}',
                            ltNoRegulation = '${values.gvNoRegulation}',
                            ltOnTime = '${values.gvOnTime}',
                            ltAbandon = '${values.gvAbandon}',
                            ltUnTrueTime = '${values.gvUnTrueTime}',
                            ltRightRule = '${values.gvRightRule}',
                            ltCitizen = '${values.gvCitizen}',
                            ltNoFullStudy = '${values.gvNoFullStudy}',
                            ltNoCard = '${values.gvNoCard}',
                            ltNoAtivities = '${values.gvNoAtivities}',
                            ltNoPayFee = '${values.gvNoPayFee}',
                            ltFullActive = '${values.gvFullActive}',
                            ltAchievementSchool = '${values.gvAchievementSchool}',
                            ltAchievementCity = '${values.gvAchievementCity}',
                            ltAdvise = '${values.gvAdvise}',
                            ltIrresponsible = '${values.gvIrresponsible}',
                            ltNoCultural = '${values.gvNoCultural}',
                            ltPositiveStudy = '${values.gvPositiveStudy}',
                            ltPositiveLove = '${values.gvPositiveLove}',
                            ltWarn = '${values.gvWarn}',
                            ltNoProtect = '${values.gvNoProtect}',
                            ltMonitor = '${values.gvMonitor}',
                            ltBonus = '${values.gvBonus}',
                            ltIrresponsibleMonitor = '${values.gvIrresponsibleMonitor}'
                            where maSv = '${maSv}' and maHK = '${maHK}'`;

      // db.query(q, (err, data) => {
      //   if (err) return res.status(500).json(err);

      //   db.query(q1, (err, data) => {
      //     if (err) return res.status(500).json(err);

      //     return res.status(200).json("Giáo viên cập nhật điểm thành công");
      //   });
      // });
      try {
        await new Promise((resolve, reject) => {
          db.query(q, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });

        await new Promise((resolve, reject) => {
          db.query(q1, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        await new Promise((resolve, reject) => {
          db.query(q2, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });

        return res.status(200).json("Cập nhật điểm thành công");
      } catch (error) {
        return error;
      }
    } else {
      const q = `
      INSERT INTO point_teacher
                                (maSv,
                                gvDiemTBHK,
                                gvCitizen,
                                gvMonitor,
                                gvNCKH1,
                                gvNCKH2,
                                gvNCKH3,
                                gvOlympic1,
                                gvOlympic2,
                                gvOlympic3,
                                gvOlympic4,
                                gvNoRegulation,
                                gvOnTime,
                                gvAbandon,
                                gvUnTrueTime,
                                gvNoFullStudy,
                                gvNoCard,
                                gvNoAtivities,
                                gvNoPayFee,
                                gvFullActive,
                                gvAchievementSchool,
                                gvAchievementCity,
                                gvAdvise,
                                gvIrresponsible,
                                gvNoCultural,
                                gvPositiveStudy,
                                gvPositiveLove,
                                gvWarn,
                                gvNoProtect,
                                gvBonus,
                                gvIrresponsibleMonitor,
                                maHK,
                                gvRightRule)
                            VALUES
                                ('${maSv}',
                                '${values.gvDiemTBHK}',
                                '${values.gvCitizen}',
                                '${values.gvMonitor}',
                                '${values.gvNCKH1}',
                                '${values.gvNCKH2}',
                                '${values.gvNCKH3}',
                                '${values.gvOlympic1}',
                                '${values.gvOlympic2}',
                                '${values.gvOlympic3}',
                                '${values.gvOlympic4}',
                                '${values.gvNoRegulation}',
                                '${values.gvOnTime}',
                                '${values.gvAbandon}',
                                '${values.gvUnTrueTime}',
                                '${values.gvNoFullStudy}',
                                '${values.gvNoCard}',
                                '${values.gvNoAtivities}',
                                '${values.gvNoPayFee}',
                                '${values.gvFullActive}',
                                '${values.gvAchievementSchool}',
                                '${values.gvAchievementCity}',
                                '${values.gvAdvise}',
                                '${values.gvIrresponsible}',
                                '${values.gvNoCultural}',
                                '${values.gvPositiveStudy}',
                                '${values.gvPositiveLove}',
                                '${values.gvWarn}',
                                '${values.gvNoProtect}',
                                '${values.gvBonus}',
                                '${values.gvIrresponsibleMonitor}',
                                '${maHK}',
                                '${values.gvRightRule}')`;
      const q1 = `update point set point_teacher = '${values.sum}', gvNote='${values.note}', status_teacher = 1 where maSv = '${maSv}' and maHK = '${maHK}'`;

      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        db.query(q1, (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Giáo viên duyệt thành công");
        });
      });
    }
  });
};

export const updatePointTeacherZero = async (req, res) => {
  const { maHK, maSv } = req.query;
  // console.log("mahk va masv: ", maHK, maSv);
  const { text, status_admin } = req.body;
  // console.log("value: ", values);
  const checkExisPointTeacher = `select maSv from point_teacher where maSv = '${maSv}' and maHK = '${maHK}'`;
  db.query(checkExisPointTeacher, async (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log("data: ", data);
    if (data.length) {
      const q = `
      update point_teacher set
                            gvDiemTBHK = 0,
                            gvNCKH1  = 0,
                            gvNCKH2 = 0,
                            gvNCKH3 = 0,
                            gvOlympic1 = 0,
                            gvOlympic2 = 0,
                            gvOlympic3 = 0,
                            gvOlympic4 = 0,
                            gvNoRegulation = 0,
                            gvOnTime = 0,
                            gvAbandon = 0,
                            gvUnTrueTime = 0,
                            gvRightRule = 0,
                            gvCitizen = 0,
                            gvNoFullStudy = 0,
                            gvNoCard = 0,
                            gvNoAtivities = 0,
                            gvNoPayFee = 0,
                            gvFullActive = 0,
                            gvAchievementSchool = 0,
                            gvAchievementCity = 0,
                            gvAdvise = 0,
                            gvIrresponsible = 0,
                            gvNoCultural = 0,
                            gvPositiveStudy = 0,
                            gvPositiveLove = 0,
                            gvWarn = 0,
                            gvNoProtect = 0,
                            gvMonitor = 0,
                            gvBonus = 0,
                            gvIrresponsibleMonitor = 0
                            where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q2 = `
      update point_student set
                            svDiemTBHK = 0,
                            svNCKH1  = 0,
                            svNCKH2 = 0,
                            svNCKH3 = 0,
                            svOlympic1 = 0,
                            svOlympic2 = 0,
                            svOlympic3 = 0,
                            svOlympic4 = 0,
                            svNoRegulation = 0,
                            svOnTime = 0,
                            svAbandon = 0,
                            svUnTrueTime = 0,
                            svRightRule = 0,
                            svCitizen = 0,
                            svNoFullStudy = 0,
                            svNoCard = 0,
                            svNoAtivities = 0,
                            svNoPayFee = 0,
                            svFullActive = 0,
                            svAchievementSchool = 0,
                            svAchievementCity = 0,
                            svAdvise = 0,
                            svIrresponsible = 0,
                            svNoCultural = 0,
                            svPositiveStudy = 0,
                            svPositiveLove = 0,
                            svWarn = 0,
                            svNoProtect = 0,
                            svMonitor = 0,
                            svBonus = 0,
                            svIrresponsibleMonitor = 0
                            where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q3 = `
                            update point_monitor set
                                                  ltDiemTBHK = 0,
                                                  ltNCKH1  = 0,
                                                  ltNCKH2 = 0,
                                                  ltNCKH3 = 0,
                                                  ltOlympic1 = 0,
                                                  ltOlympic2 = 0,
                                                  ltOlympic3 = 0,
                                                  ltOlympic4 = 0,
                                                  ltNoRegulation = 0,
                                                  ltOnTime = 0,
                                                  ltAbandon = 0,
                                                  ltUnTrueTime = 0,
                                                  ltRightRule = 0,
                                                  ltCitizen = 0,
                                                  ltNoFullStudy = 0,
                                                  ltNoCard = 0,
                                                  ltNoAtivities = 0,
                                                  ltNoPayFee = 0,
                                                  ltFullActive = 0,
                                                  ltAchievementSchool = 0,
                                                  ltAchievementCity = 0,
                                                  ltAdvise = 0,
                                                  ltIrresponsible = 0,
                                                  ltNoCultural = 0,
                                                  ltPositiveStudy = 0,
                                                  ltPositiveLove = 0,
                                                  ltWarn = 0,
                                                  ltNoProtect = 0,
                                                  ltMonitor = 0,
                                                  ltBonus = 0,
                                                  ltIrresponsibleMonitor = 0
                                                  where maSv = '${maSv}' and maHK = '${maHK}'`;
      const q1 = `update 
      point set point_teacher = 0, 
      point_monitor = 0, 
      point_student = 0, 
      gvNote='${text}', 
      status_teacher = 1,
      status_admin = ${status_admin === 1 ? 1 : 0}
      where 
      maSv = '${maSv}' and maHK = '${maHK}'`;
      // db.query(q, (err, data) => {
      //   if (err) return res.status(500).json(err);

      //   db.query(q1, (err, data) => {
      //     if (err) return res.status(500).json(err);

      //     return res.status(200).json("Giáo viên cập nhật điểm thành công");
      //   });
      // });
      try {
        await new Promise((resolve, reject) => {
          db.query(q, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });

        await new Promise((resolve, reject) => {
          db.query(q1, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        await new Promise((resolve, reject) => {
          db.query(q2, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        await new Promise((resolve, reject) => {
          db.query(q3, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        // await new Promise((resolve, reject) => {
        //   db.query(q3, (err, data) => {
        //     if (err) reject(err);
        //     resolve();
        //   });
        // });

        return res.status(200).json("Giáo viên cập nhật điểm thành công");
      } catch (error) {
        return error;
      }
    } else {
      const q = `
      INSERT INTO point_teacher 
                                (maSv, 
                                gvDiemTBHK, 
                                gvCitizen, 
                                gvMonitor, 
                                gvNCKH1, 
                                gvNCKH2, 
                                gvNCKH3, 
                                gvOlympic1, 
                                gvOlympic2, 
                                gvOlympic3, 
                                gvOlympic4, 
                                gvNoRegulation, 
                                gvOnTime, 
                                gvAbandon, 
                                gvUnTrueTime, 
                                gvNoFullStudy, 
                                gvNoCard, 
                                gvNoAtivities, 
                                gvNoPayFee, 
                                gvFullActive, 
                                gvAchievementSchool, 
                                gvAchievementCity, 
                                gvAdvise, 
                                gvIrresponsible, 
                                gvNoCultural, 
                                gvPositiveStudy, 
                                gvPositiveLove, 
                                gvWarn, 
                                gvNoProtect, 
                                gvBonus, 
                                gvIrresponsibleMonitor, 
                                maHK, 
                                gvRightRule)
                            VALUES 
                                ('${maSv}', 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                '${maHK}', 
                                0)`;
      const q2 = `
      INSERT INTO point_monitor 
                                (maSv, 
                                ltDiemTBHK, 
                                ltCitizen, 
                                ltMonitor, 
                                ltNCKH1, 
                                ltNCKH2, 
                                ltNCKH3, 
                                ltOlympic1, 
                                ltOlympic2, 
                                ltOlympic3, 
                                ltOlympic4, 
                                ltNoRegulation, 
                                ltOnTime, 
                                ltAbandon, 
                                ltUnTrueTime, 
                                ltNoFullStudy, 
                                ltNoCard, 
                                ltNoAtivities, 
                                ltNoPayFee, 
                                ltFullActive, 
                                ltAchievementSchool, 
                                ltAchievementCity, 
                                ltAdvise, 
                                ltIrresponsible, 
                                ltNoCultural, 
                                ltPositiveStudy, 
                                ltPositiveLove, 
                                ltWarn, 
                                ltNoProtect, 
                                ltBonus, 
                                ltIrresponsibleMonitor, 
                                maHK, 
                                ltRightRule)
                            VALUES 
                                ('${maSv}', 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                0, 
                                '${maHK}', 
                                0)`;
      const q3 = `
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
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          0, 
                                                          '${maHK}', 
                                                          0)`;
      const q1 = `update point set 
      point_teacher = 0, 
      point_monitor = 0, 
      point_student = 0, 
      gvNote='Không sinh hoạt lớp', 
      status_teacher = 1 
      where 
      maSv = '${maSv}' and maHK = '${maHK}'`;

      // db.query(q, (err, data) => {
      //   if (err) return res.status(500).json(err);

      //   db.query(q1, (err, data) => {
      //     if (err) return res.status(500).json(err);

      //     return res.status(200).json("Giáo viên duyệt thành công");
      //   });
      // });
      try {
        await new Promise((resolve, reject) => {
          db.query(q, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        await new Promise((resolve, reject) => {
          db.query(q2, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        await new Promise((resolve, reject) => {
          db.query(q3, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
        await new Promise((resolve, reject) => {
          db.query(q1, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });

        return res.status(200).json("Giáo viên cập nhật điểm thành công");
      } catch (error) {
        return error;
      }
    }
  });
};

// danh sách điểm rèn luyện
export const getListPointByMaSV = (req, res) => {
  const { maSv } = req.query;
  // console.log("xuong get danh sach diem: ", maSv);
  const query = `SELECT semester.name, point.* from semester, point WHERE point.maHK = semester.maHK and point.maSv = '${maSv}'`;
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const pointBasicChart = (req, res) => {
  console.log(req.query);
  const { maLop, tiLeOrSoLuong } = req.query;
  console.log("type: ", typeof tiLeOrSoLuong);
  let query;

  if (tiLeOrSoLuong === "1") {
    query = `
      SELECT 
      maHK, 
      COUNT(*) AS 'TongSV', 
      COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) AS 'KEM', 
      COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) AS 'Y', 
      COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) AS 'TB', 
      COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) AS 'TBK', 
      COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) AS 'KHA', 
      COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) AS 'G', 
      COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) AS 'XS' 
      FROM 
      point, class, students 
      WHERE 
      point.maSv = students.maSv AND 
      students.maLop = class.maLop and 
      class.maLop = '${maLop}' and 
      status_teacher = 1 
      GROUP BY maHK
    `;
  } else {
    query = `
      SELECT
      maHK,
      COUNT(*) AS 'TongSV',
      ROUND(COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) / COUNT(*) * 100, 2) AS 'KEM',
      ROUND(COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) / COUNT(*) * 100, 2) AS 'Y',
      ROUND(COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) / COUNT(*) * 100, 2) AS 'TB',
      ROUND(COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) / COUNT(*) * 100, 2) AS 'TBK',
      ROUND(COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) / COUNT(*) * 100, 2) AS 'KHA',
      ROUND(COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) / COUNT(*) * 100, 2) AS 'G',
      ROUND(COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) / COUNT(*) * 100, 2) AS 'XS'
      FROM
      point, class, students
      WHERE
      point.maSv = students.maSv AND
      students.maLop = class.maLop AND
      class.maLop = '${maLop}' AND
      status_teacher = 1
      GROUP BY maHK
    `;
  }

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const pointBasicChartPercent = (req, res) => {
  const { maLop } = req.query;
  const query = `
  SELECT
  maHK,
  COUNT(*) AS 'TongSV',
  ROUND(COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) / COUNT(*) * 100, 2) AS 'KEM',
  ROUND(COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) / COUNT(*) * 100, 2) AS 'Y',
  ROUND(COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) / COUNT(*) * 100, 2) AS 'TB',
  ROUND(COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) / COUNT(*) * 100, 2) AS 'TBK',
  ROUND(COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) / COUNT(*) * 100, 2) AS 'KHA',
  ROUND(COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) / COUNT(*) * 100, 2) AS 'G',
  ROUND(COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) / COUNT(*) * 100, 2) AS 'XS'
  FROM
  point, class, students
  WHERE
  point.maSv = students.maSv AND
  students.maLop = class.maLop AND
  class.maLop = '${maLop}' AND
  status_teacher = 1
  GROUP BY maHK
  `;
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const pointGvNote = (req, res) => {
  const { maSv, maHK } = req.query;
  const query = `
  SELECT gvNote FROM point WHERE maSv = '${maSv}' and maHK = '${maHK}'
  `;
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(...data);
  });
};

export const statisticalPieDepartment = (req, res) => {
  const { maHK, maKhoaHoc, maKhoa } = req.query;
  const q = `
  SELECT
    maHK,
    COUNT(*) AS TongSV,
    COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) AS KEM,
    COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) AS Y,
    COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) AS TB,
    COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) AS TBK,
    COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) AS KHA,
    COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) AS G,
    COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) AS XS,
    ROUND(COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) / COUNT(*) * 100, 2) AS KEM_Percent,
    ROUND(COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) / COUNT(*) * 100, 2) AS Y_Percent,
    ROUND(COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) / COUNT(*) * 100, 2) AS TB_Percent,
    ROUND(COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) / COUNT(*) * 100, 2) AS TBK_Percent,
    ROUND(COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) / COUNT(*) * 100, 2) AS KHA_Percent,
    ROUND(COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) / COUNT(*) * 100, 2) AS G_Percent,
    ROUND(COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) / COUNT(*) * 100, 2) AS XS_Percent
FROM
    point
JOIN students ON point.maSv = students.maSv
JOIN class ON students.maLop = class.maLop
JOIN teacher on class.maGv = teacher.maGv
JOIN department on teacher.maKhoa = department.maKhoa
WHERE
department.maKhoa = '${maKhoa}' and class.maKhoaHoc = '${maKhoaHoc}' AND
point.maHK = '${maHK}' and
    status_teacher = 1
GROUP BY maHK
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(...data);
  });
};

export const statisticalStackChartAdmin = (req, res) => {
  const { maHK, maKhoaHoc, tiLeOrSoLuong } = req.query;
  // console.log("query: ", req.query.tiLeOrSoLuong);
  let q;
  if (tiLeOrSoLuong === "1") {
    q = `
    SELECT
      department.maKhoa,
      department.name as 'tenKhoa',
      COUNT(*) AS TongSV,
      COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) AS KEM,
      COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) AS Y,
      COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) AS TB,
      COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) AS TBK,
      COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) AS KHA,
      COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) AS G,
      COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) AS XS
  FROM
      department
  LEFT JOIN teacher ON department.maKhoa = teacher.maKhoa
  LEFT JOIN class ON teacher.maGv = class.maGv
  LEFT JOIN course ON (class.maKhoaHoc = course.maKhoaHoc OR class.maKhoaHoc IS NULL)
  LEFT JOIN students ON class.maLop = students.maLop
  LEFT JOIN point ON students.maSv = point.maSv AND point.status_teacher = 1
  WHERE
  course.maKhoaHoc = '${maKhoaHoc}' AND point.maHK = '${maHK}'
  GROUP BY department.maKhoa
    `;
  } else {
    q = `
    SELECT
      department.maKhoa,
      department.name as 'tenKhoa',
      COUNT(*) AS TongSV,
      ROUND(COUNT(CASE WHEN point_teacher >= 0 AND point_teacher < 30 THEN 1 END) / COUNT(*) * 100, 2) AS 'KEM',
      ROUND(COUNT(CASE WHEN point_teacher >= 30 AND point_teacher < 50 THEN 1 END) / COUNT(*) * 100, 2) AS 'Y',
      ROUND(COUNT(CASE WHEN point_teacher >= 50 AND point_teacher < 60 THEN 1 END) / COUNT(*) * 100, 2) AS 'TB',
      ROUND(COUNT(CASE WHEN point_teacher >= 60 AND point_teacher < 70 THEN 1 END) / COUNT(*) * 100, 2) AS 'TBK',
      ROUND(COUNT(CASE WHEN point_teacher >= 70 AND point_teacher < 80 THEN 1 END) / COUNT(*) * 100, 2) AS 'KHA',
      ROUND(COUNT(CASE WHEN point_teacher >= 80 AND point_teacher < 90 THEN 1 END) / COUNT(*) * 100, 2) AS 'G',
      ROUND(COUNT(CASE WHEN point_teacher >= 90 AND point_teacher <= 100 THEN 1 END) / COUNT(*) * 100, 2) AS 'XS'
  FROM
      department
  LEFT JOIN teacher ON department.maKhoa = teacher.maKhoa
  LEFT JOIN class ON teacher.maGv = class.maGv
  LEFT JOIN course ON (class.maKhoaHoc = course.maKhoaHoc OR class.maKhoaHoc IS NULL)
  LEFT JOIN students ON class.maLop = students.maLop
  LEFT JOIN point ON students.maSv = point.maSv AND point.status_teacher = 1
  WHERE
      course.maKhoaHoc = '${maKhoaHoc}' AND point.maHK = '${maHK}'
  GROUP BY department.maKhoa
    `;
  }
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPointByMaAdmin = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const { maSv, maHK } = req.query;
  console.log("xuong day: ", req.query);
  const q = `
  SELECT * FROM point WHERE maSv = '${maSv}' and maHK = '${maHK}'
    `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};
