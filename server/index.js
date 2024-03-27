import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import departmentRouter from "./routes/departments.js";
import courseRouter from "./routes/courses.js";
import semesterRouter from "./routes/semesters.js";
import teacherRouter from "./routes/teachers.js";
import classRouter from "./routes/classes.js";
import deadlineRouter from "./routes/deadlines.js";
import studentRouter from "./routes/students.js";
import pointCitizenRouter from "./routes/point_citizens.js";
import pointMediumRouter from "./routes/point_mediums.js";
import pointMarkRouter from "./routes/points.js";
import proofMarkRouter from "./routes/proof_mark.js";
import majorRouter from "./routes/major.js";
import deadlineRouterAdmin from "./routes/deadlines_admin.js";
import pointRouterAdmin from "./routes/point_admin.js";
import deadlineRouterPoint from "./routes/deadlines_point.js";

import { Server } from "socket.io";
import multer from "multer";
import xlsx from "xlsx";
import nodemailer from "nodemailer";
import { db } from "./db.js";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/courses", courseRouter);
app.use("/api/semesters", semesterRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/class", classRouter);
app.use("/api/deadlines", deadlineRouter);
app.use("/api/students", studentRouter);
app.use("/api/point_citizen", pointCitizenRouter);
app.use("/api/point_medium", pointMediumRouter);
app.use("/api/points", pointMarkRouter);
app.use("/api/proof_mark", proofMarkRouter);
app.use("/api/major", majorRouter);
app.use("/api/major", majorRouter);
app.use("/api/deadlines_admin", deadlineRouterAdmin);
app.use("/api/deadlines_point", deadlineRouterPoint);

app.use("/api/point_admin", pointRouterAdmin);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: (req, file, callback) => {
    const randomName = Date.now();
    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const fileName = randomName + "-" + originalName;
    callback(null, fileName); // Tên file được lưu
  },
});
const upload = multer({ storage });

app.post("/api/excel/students/:maLop", upload.single("file"), (req, res) => {
  // if (err) return res.status(500).json(err);
  const maLop = req.params.maLop;
  const file = req.file.path;
  const workbook = xlsx.readFile(file);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  // console.log("datas ne: ", data.length);
  // console.log(maLop);
  for (let i = 1; i <= data.length; i++) {
    const record = data[i];
    if (record && record[1] !== undefined && record[1] !== null) {
      // console.log("record: ", record[1]);
      const maSv = record[1];
      // console.log("record: ", record);
      const name = `${record[2]} ${record[3]}`;

      // console.log("name: ", name);
      db.query(
        `SELECT maSv FROM students WHERE maSv = '${maSv}'`,
        (err, data) => {
          if (data.length > 0) {
            db.query(
              `select maSv from students where maSv = '${maSv}' and maLop != '${maLop}'`,
              (err, data) => {
                if (data.length > 0) {
                  console.log("handle skip");
                } else {
                  db.query(
                    "UPDATE students SET name = ?, maLop = ? WHERE maSv = ?",
                    [name, maLop, maSv]
                  );
                }
              }
            );
          } else {
            db.query(
              "INSERT INTO students (maSv, name, maLop) VALUES (?, ?, ?)",
              [maSv, name, maLop]
            );
          }
        }
      );
    }
  }
  return res.status(200).json("Thanh cong");
});
function generateQueryCDSV(tableName, field, maHK, maSv) {
  return `
    SELECT
    ${tableName}.${field}DiemTBHK + ${tableName}.${field}NCKH1 + ${tableName}.${field}NCKH2 + ${tableName}.${field}NCKH3 + ${tableName}.${field}Olympic1 + ${tableName}.${field}Olympic2 
      + ${tableName}.${field}Olympic3 + ${tableName}.${field}Olympic4 + ${tableName}.${field}NoRegulation + ${tableName}.${field}OnTime 
      + ${tableName}.${field}Abandon + ${tableName}.${field}UnTrueTime + ${tableName}.${field}RightRule  
      + ${tableName}.${field}NoFullStudy + ${tableName}.${field}NoCard + ${tableName}.${field}NoAtivities + ${tableName}.${field}NoPayFee +
      ${tableName}.${field}FullActive + ${tableName}.${field}AchievementSchool + ${tableName}.${field}AchievementCity 
      + ${tableName}.${field}Advise + ${tableName}.${field}Irresponsible + ${tableName}.${field}NoCultural +
      ${tableName}.${field}PositiveStudy + ${tableName}.${field}PositiveLove + ${tableName}.${field}Warn + ${tableName}.${field}NoProtect +
      ${tableName}.${field}Monitor + ${tableName}.${field}Bonus + ${tableName}.${field}IrresponsibleMonitor AS 'sum'
    FROM
      ${tableName}
    WHERE
      maHK = '${maHK}' AND
      maSv = '${maSv}'
  `;
}

function updatePointCDSV(tableName, field, maHK, maSv, point) {
  return `
  update ${tableName} set ${field}Citizen = '${point}' where maSv = '${maSv}' and maHK = '${maHK}'
  `;
}
app.post(
  "/api/excel/students/diemtuancdsv/:maLop/:maHK",
  upload.single("file"),
  (req, res) => {
    // if (err) return res.status(500).json(err);

    const { maLop, maHK } = req.params;
    const file = req.file.path;
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    // console.log(data);
    // console.log(maLop);
    let errArr = [];
    for (let i = 1; i < data.length; i++) {
      const record = data[i];
      let point;
      // console.log(record);
      if (record && record[1] !== undefined && record[1] !== null) {
        const diemCDSV = record[4];
        const maSv = record[1];
        point =
          diemCDSV >= 90 ? 15 : diemCDSV >= 65 ? 10 : diemCDSV >= 50 ? 5 : 0;
        db.query(
          `select maSv from students where maSv = '${maSv}' and maLop = '${maLop}'`,
          async (err, data) => {
            if (data.length > 0) {
              db.query(
                `SELECT maSv FROM point_citizen WHERE maSv = '${maSv}' and maHK='${maHK}'`,
                async (err, data) => {
                  if (data.length > 0) {
                    await new Promise((resolve, reject) => {
                      db.query(
                        `
                        UPDATE point_citizen 
                        SET point = ${diemCDSV} WHERE maSv = '${maSv}' and maHK = '${maHK}'`,
                        (err, data) => {
                          if (err) reject(err);
                          else {
                            // console.log("phai vao day chu nhi");
                            resolve();
                          }
                        }
                      );
                    });
                    const q = `select * from point where maHK='${maHK}' and maSv='${maSv}'`;
                    try {
                      await new Promise((resolve, reject) => {
                        db.query(q, async (err, data) => {
                          if (err) reject(err);
                          if (data.length > 0) {
                            const { status, status_teacher } = data[0];
                            if (status === 0) {
                              // console.log("sv cham");
                              const sumSV = generateQueryCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumSVOld = await new Promise(
                                (resolve, reject) => {
                                  db.query(sumSV, (err, data) => {
                                    if (err) reject(err);
                                    else resolve(data[0].sum);
                                  });
                                }
                              );
                              const sumSVNew = sumSVOld + point;
                              // console.log("sumSVNew: ", sumSVNew);
                              await new Promise((resolve, reject) => {
                                db.query(
                                  `UPDATE point SET point_student = '${sumSVNew}'
                                WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                  (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                  }
                                );
                              });
                              const updatePointStudent = updatePointCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );

                              await new Promise((resolve, reject) => {
                                db.query(updatePointStudent, (err, data) => {
                                  if (err) reject(err);
                                  else resolve();
                                });
                              });
                            }

                            if (status === 1 && status_teacher === 0) {
                              const sumSV = generateQueryCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              try {
                                const [sumSVOld, sumLTOld] = await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(sumSV, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(sumLT, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                            }
                            if (status_teacher === 1) {
                              const sumSV = generateQueryCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const sumGV = generateQueryCDSV(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointTeacher = updatePointCDSV(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv,
                                point
                              );

                              try {
                                const [sumSVOld, sumLTOld, sumGVOld] =
                                  await Promise.all([
                                    new Promise((resolve, reject) => {
                                      db.query(sumSV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumLT, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumGV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                  ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;
                                const sumGVNew = sumGVOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}',
                                  point_teacher = '${sumGVNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointTeacher,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                            }
                          }
                        });
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    await new Promise((resolve, reject) => {
                      db.query(
                        `INSERT INTO point_citizen (maSv, maHK, point) VALUES ('${maSv}', '${maHK}', ${diemCDSV})`,
                        (err, data) => {
                          if (err) reject(err);
                          else {
                            resolve();
                          }
                        }
                      );
                    });
                    const q = `select * from point where maHK='${maHK}' and maSv='${maSv}'`;
                    try {
                      await new Promise((resolve, reject) => {
                        db.query(q, async (err, data) => {
                          if (err) reject(err);
                          if (data.length > 0) {
                            const { status, status_teacher } = data[0];
                            if (status === 0) {
                              // console.log("sv cham");
                              const sumSV = generateQueryCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumSVOld = await new Promise(
                                (resolve, reject) => {
                                  db.query(sumSV, (err, data) => {
                                    if (err) reject(err);
                                    else resolve(data[0].sum);
                                  });
                                }
                              );
                              const sumSVNew = sumSVOld + point;
                              // console.log("sumSVNew: ", sumSVNew);
                              await new Promise((resolve, reject) => {
                                db.query(
                                  `UPDATE point SET point_student = '${sumSVNew}'
                                WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                  (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                  }
                                );
                              });
                              const updatePointStudent = updatePointCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );

                              await new Promise((resolve, reject) => {
                                db.query(updatePointStudent, (err, data) => {
                                  if (err) reject(err);
                                  else resolve();
                                });
                              });
                            }

                            if (status === 1 && status_teacher === 0) {
                              const sumSV = generateQueryCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              try {
                                const [sumSVOld, sumLTOld] = await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(sumSV, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(sumLT, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                            }
                            if (status_teacher === 1) {
                              const sumSV = generateQueryCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const sumGV = generateQueryCDSV(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointCDSV(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointCDSV(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointTeacher = updatePointCDSV(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv,
                                point
                              );

                              try {
                                const [sumSVOld, sumLTOld, sumGVOld] =
                                  await Promise.all([
                                    new Promise((resolve, reject) => {
                                      db.query(sumSV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumLT, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumGV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                  ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;
                                const sumGVNew = sumGVOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}',
                                  point_teacher = '${sumGVNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointTeacher,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                            }
                          }
                        });
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
              );
            } else {
              errArr.push(maSv);
              // console.log("handle skip: ", maSv);
            }
          }
        );
      }
    }
    console.log("errArr: ", errArr);
    return res.status(200).json(errArr);
  }
);

function generateQueryTBHK(tableName, field, maHK, maSv) {
  return `
    SELECT
      ${tableName}.${field}NCKH1 + ${tableName}.${field}NCKH2 + ${tableName}.${field}NCKH3 + ${tableName}.${field}Olympic1 + ${tableName}.${field}Olympic2 
      + ${tableName}.${field}Olympic3 + ${tableName}.${field}Olympic4 + ${tableName}.${field}NoRegulation + ${tableName}.${field}OnTime 
      + ${tableName}.${field}Abandon + ${tableName}.${field}UnTrueTime + ${tableName}.${field}RightRule + ${tableName}.${field}Citizen 
      + ${tableName}.${field}NoFullStudy + ${tableName}.${field}NoCard + ${tableName}.${field}NoAtivities + ${tableName}.${field}NoPayFee +
      ${tableName}.${field}FullActive + ${tableName}.${field}AchievementSchool + ${tableName}.${field}AchievementCity 
      + ${tableName}.${field}Advise + ${tableName}.${field}Irresponsible + ${tableName}.${field}NoCultural +
      ${tableName}.${field}PositiveStudy + ${tableName}.${field}PositiveLove + ${tableName}.${field}Warn + ${tableName}.${field}NoProtect +
      ${tableName}.${field}Monitor + ${tableName}.${field}Bonus + ${tableName}.${field}IrresponsibleMonitor AS 'sum'
    FROM
      ${tableName}
    WHERE
      maHK = '${maHK}' AND
      maSv = '${maSv}'
  `;
}

function updatePointTBHK(tableName, field, maHK, maSv, point) {
  return `
  update ${tableName} set ${field}DiemTBHK = '${point}' where maSv = '${maSv}' and maHK = '${maHK}'
  `;
}

app.post(
  "/api/excel/students/diemtbhk/:maLop/:maHK",
  upload.single("file"),
  async (req, res) => {
    // if (err) return res.status(500).json(err);
    const maLop = req.params.maLop;
    const maHK = req.params.maHK;
    const file = req.file.path;
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    // console.log(data);
    // console.log(maLop);
    for (let i = 1; i < data.length; i++) {
      let point;
      const record = data[i];
      // console.log("record: ", record);
      if (record && record[0] !== undefined && record[0] !== null) {
        // console.log("record: ", typeof record[5]);
        const diemTBHK = record[5];
        const maSv = record[0];
        point =
          diemTBHK >= 3.6
            ? 20
            : diemTBHK >= 3.2
            ? 18
            : diemTBHK >= 2.5
            ? 16
            : diemTBHK >= 2.0
            ? 12
            : diemTBHK >= 1.5
            ? 10
            : diemTBHK >= 1.0
            ? 8
            : 0;
        db.query(
          `select maSv from students where maSv = '${maSv}' and maLop = '${maLop}'`,
          async (err, data) => {
            if (data.length > 0) {
              db.query(
                `SELECT maSv FROM point_medium WHERE maSv = '${maSv}' and maHK='${maHK}'`,
                async (err, data) => {
                  if (data.length > 0) {
                    await new Promise((resolve, reject) => {
                      db.query(
                        `
                      UPDATE point_medium SET point_average = ${diemTBHK} WHERE maSv = '${maSv}' and maHK = '${maHK}'
                    `,
                        (err, data) => {
                          if (err) reject(err);
                          else {
                            // console.log("phai vao day chu nhi");
                            resolve();
                          }
                        }
                      );
                    });

                    const q = `select * from point where maHK='${maHK}' and maSv='${maSv}'`;

                    try {
                      // console.log("point: ", point);

                      await new Promise((resolve, reject) => {
                        db.query(q, async (err, data) => {
                          if (err) reject(err);
                          if (data.length > 0) {
                            const { status, status_teacher } = data[0];
                            if (status === 0) {
                              // console.log("sv cham");
                              const sumSV = generateQueryTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumSVOld = await new Promise(
                                (resolve, reject) => {
                                  db.query(sumSV, (err, data) => {
                                    if (err) reject(err);
                                    else resolve(data[0].sum);
                                  });
                                }
                              );
                              const sumSVNew = sumSVOld + point;
                              // console.log("sumSVNew: ", sumSVNew);
                              await new Promise((resolve, reject) => {
                                db.query(
                                  `UPDATE point SET point_student = '${sumSVNew}'
                                WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                  (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                  }
                                );
                              });
                              const updatePointStudent = updatePointTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );

                              await new Promise((resolve, reject) => {
                                db.query(updatePointStudent, (err, data) => {
                                  if (err) reject(err);
                                  else resolve();
                                });
                              });
                            }

                            if (status === 1 && status_teacher === 0) {
                              const sumSV = generateQueryTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              try {
                                const [sumSVOld, sumLTOld] = await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(sumSV, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(sumLT, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                            }
                            if (status_teacher === 1) {
                              const sumSV = generateQueryTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const sumGV = generateQueryTBHK(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointTeacher = updatePointTBHK(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv,
                                point
                              );

                              try {
                                const [sumSVOld, sumLTOld, sumGVOld] =
                                  await Promise.all([
                                    new Promise((resolve, reject) => {
                                      db.query(sumSV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumLT, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumGV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                  ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;
                                const sumGVNew = sumGVOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}',
                                  point_teacher = '${sumGVNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointTeacher,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                              // await new Promise((resolve, reject) => {
                              //   db.query(sumSV, (err, data) => {
                              //     if (err) reject(err);
                              //     // resolve();
                              //     const sumNew = data[0].sum + point;
                              //     // console.log("sumnew: ", sumNew);
                              //     db.query(
                              //       `update point set point_student = '${sumNew}' where maSv = '${maSv}' and maHK = '${maHK}'`
                              //     );
                              //   });
                              // });
                            }
                          }
                          // resolve();
                          // console.log("data: ", data[0]);
                        });
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    await new Promise((resolve, reject) => {
                      db.query(
                        `
                    INSERT INTO point_medium (maSv, maHK, point_average) VALUES ('${maSv}', '${maHK}', ${diemTBHK})
                    `,
                        (err, data) => {
                          if (err) reject(err);
                          else {
                            resolve();
                          }
                        }
                      );
                    });
                    const q = `select * from point where maHK='${maHK}' and maSv='${maSv}'`;

                    try {
                      // console.log("point: ", point);

                      await new Promise((resolve, reject) => {
                        db.query(q, async (err, data) => {
                          if (err) reject(err);
                          if (data.length > 0) {
                            const { status, status_teacher } = data[0];
                            if (status === 0) {
                              // console.log("sv cham");
                              const sumSV = generateQueryTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumSVOld = await new Promise(
                                (resolve, reject) => {
                                  db.query(sumSV, (err, data) => {
                                    if (err) reject(err);
                                    else resolve(data[0].sum);
                                  });
                                }
                              );
                              const sumSVNew = sumSVOld + point;
                              // console.log("sumSVNew: ", sumSVNew);
                              await new Promise((resolve, reject) => {
                                db.query(
                                  `UPDATE point SET point_student = '${sumSVNew}'
                                WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                  (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                  }
                                );
                              });
                              const updatePointStudent = updatePointTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );

                              await new Promise((resolve, reject) => {
                                db.query(updatePointStudent, (err, data) => {
                                  if (err) reject(err);
                                  else resolve();
                                });
                              });
                            }

                            if (status === 1 && status_teacher === 0) {
                              const sumSV = generateQueryTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              try {
                                const [sumSVOld, sumLTOld] = await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(sumSV, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(sumLT, (err, data) => {
                                      if (err) reject(err);
                                      else resolve(data[0].sum);
                                    });
                                  }),
                                ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                            }
                            if (status_teacher === 1) {
                              const sumSV = generateQueryTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv
                              );
                              const sumLT = generateQueryTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv
                              );
                              const sumGV = generateQueryTBHK(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv
                              );
                              const updatePointStudent = updatePointTBHK(
                                "point_student",
                                "sv",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointMonitor = updatePointTBHK(
                                "point_monitor",
                                "lt",
                                maHK,
                                maSv,
                                point
                              );
                              const updatePointTeacher = updatePointTBHK(
                                "point_teacher",
                                "gv",
                                maHK,
                                maSv,
                                point
                              );

                              try {
                                const [sumSVOld, sumLTOld, sumGVOld] =
                                  await Promise.all([
                                    new Promise((resolve, reject) => {
                                      db.query(sumSV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumLT, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                    new Promise((resolve, reject) => {
                                      db.query(sumGV, (err, data) => {
                                        if (err) reject(err);
                                        else resolve(data[0].sum);
                                      });
                                    }),
                                  ]);

                                const sumSVNew = sumSVOld + point;
                                const sumLTNew = sumLTOld + point;
                                const sumGVNew = sumGVOld + point;

                                // Tiến hành cập nhật điểm
                                await new Promise((resolve, reject) => {
                                  db.query(
                                    `UPDATE point SET point_student = '${sumSVNew}',
                                  point_monitor = '${sumLTNew}',
                                  point_teacher = '${sumGVNew}'
                                  WHERE maSv = '${maSv}' AND maHK = '${maHK}'`,
                                    (err) => {
                                      if (err) reject(err);
                                      else resolve();
                                    }
                                  );
                                });
                                await Promise.all([
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointStudent,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointMonitor,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                  new Promise((resolve, reject) => {
                                    db.query(
                                      updatePointTeacher,
                                      (err, data) => {
                                        if (err) reject(err);
                                        else resolve();
                                      }
                                    );
                                  }),
                                ]);

                                // Trả về kết quả nếu cần
                                // return res.status(200).json("Thành công");
                              } catch (error) {
                                return res.status(500).json("Lỗi server");
                              }
                              // await new Promise((resolve, reject) => {
                              //   db.query(sumSV, (err, data) => {
                              //     if (err) reject(err);
                              //     // resolve();
                              //     const sumNew = data[0].sum + point;
                              //     // console.log("sumnew: ", sumNew);
                              //     db.query(
                              //       `update point set point_student = '${sumNew}' where maSv = '${maSv}' and maHK = '${maHK}'`
                              //     );
                              //   });
                              // });
                            }
                          }
                          // resolve();
                          // console.log("data: ", data[0]);
                        });
                      });
                    } catch (error) {
                      console.log(error);
                    }
                    // db.query(q, (err, data) => {
                    //   if (err) return res.status(500).json(err);

                    //   console.log("data: ", data);
                    // });
                  }
                }
              );
            } else {
              console.log("handle skip here");
            }
          }
        );
      }
    }
    return res.status(200).json("Thanh cong");
  }
);

/*
app.post(
  "/api/excel/students/diemtbhk/:maLop/:maHK",
  upload.single("file"),
  (req, res) => {
    // if (err) return res.status(500).json(err);
    const maLop = req.params.maLop;
    const maHK = req.params.maHK;
    const file = req.file.path;
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    // console.log(data);
    // console.log(maLop);
    for (let i = 1; i < data.length; i++) {
      const record = data[i];
      // console.log("record: ", record);
      if (record && record[0] !== undefined && record[0] !== null) {
        // console.log("record: ", typeof record[5]);
        const diemTBHK = record[5];
        db.query(
          `SELECT maSv FROM point_medium WHERE maSv = '${record[0]}' and maHK='${maHK}'`,
          (err, data) => {
            if (data.length > 0) {
              db.query(
                "UPDATE point_medium SET point_average = ?, maHK = ? WHERE maSv = ? and maHK = ?",
                [diemTBHK, maHK, data[0].maSv, maHK]
              );
            } else {
              db.query(
                "INSERT INTO point_medium (maSv, maHK, point_average) VALUES (?, ?, ?)",
                [record[0], maHK, diemTBHK]
              );
            }
          }
        );
      }
    }
    return res.status(200).json("Thanh cong");
  }
);
*/

app.post("/api/upload", upload.array("images", 10), (req, res) => {
  // const currentTime = new Date().getTime();
  const uploadedFiles = req.files.map((file) => {
    // const newFileName = `${currentTime}-${file.originalname}`;
    return file.filename;
  });
  // console.log("Uploaded files:", file);

  // You can process the files further or save them to a database

  return res.status(200).json(uploadedFiles);
});

// node mail
// Định cấu hình transporter của nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ngoduy090801@gmail.com",
    pass: "kmwpncrgpjwgbhyr",
  },
});

// API endpoint để gửi email
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, randomNumber, svOrGv } = req.body;
    const checkEmailExis = () => {
      return new Promise((resolve, reject) => {
        let q;
        if (svOrGv === "1") {
          q = `select email from students where email = '${to}'`;
        } else {
          q = `select email from teacher where email = '${to}'`;
        }
        db.query(q, (err, data) => {
          if (err) return reject(err);
          resolve(data.length > 0);
        });
      });
    };
    const updateEmail = () => {
      return new Promise(async (resolve, reject) => {
        const mailOptions = {
          from: "ngoduy090801@gmail.com",
          to,
          subject,
          html: `${text}: <b>${randomNumber}</b>`,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        resolve();

        // res.status(200).json(randomNumber);
      });
    };
    try {
      const isEmailExist = await checkEmailExis();
      if (isEmailExist) {
        res.status(409).json("Email đã tồn tại");
      } else {
        await updateEmail();
        res.status(200).json(randomNumber);
      }
    } catch (error) {
      res.status(500).json(error);
    }
    // console.log("ssser: ", randomNumber);
    // Định cấu hình email options
    // const mailOptions = {
    //   from: "ngoduy090801@gmail.com",
    //   to,
    //   subject,
    //   html: `${text}: <b>${randomNumber}</b>`,
    // };

    // // Gửi email
    // await transporter.sendMail(mailOptions);

    // res.status(200).json(randomNumber);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/forget-pass", async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    // Định cấu hình email options
    const mailOptions = {
      from: "ngoduy090801@gmail.com",
      to,
      subject,
      html: `Mật khẩu mới là: ${text}`,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    const q = `update students set password='${text}' where email='${to}'`;

    // const values = [req.body.maKhoa]

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thay doi sinh vien thanh cong");
    });

    // res.status(200).json("pass");

    // console.log("ssser: ", randomNumber);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
// socket
const io = new Server({
  /* options */
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (maSv, socketId) => {
  // console.log("vao add new user: ", socketId);
  !onlineUsers.some((user) => user.maSv === maSv) &&
    onlineUsers.push({ maSv, socketId });
  // console.log("onlineUsers: ", onlineUsers);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (maSv) => {
  return onlineUsers.find((user) => user.maSv === maSv);
};

io.on("connection", (socket) => {
  // console.log("socket: ", socket.id);
  socket.on("newUser", (user) => {
    addNewUser(user.maSv, socket.id);
    // console.log("vao day di ma, please: ", socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    // console.log("vao day xem ano: ", senderName, receiverName);
    const receiver = getUser(receiverName);
    // console.log("receiver no ti: ", receiverName);
    if (receiver) {
      // console.log("người nhận: ", receiver.socketId);
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        currentTime: Date.now(),
      });
    }
  });

  socket.on("logoutUser", (id) => {
    removeUser(id);
    // console.log("online user logout: ", onlineUsers);
  });

  socket.on("disconnect", () => {
    // removeUser(socket.id);
    console.log("someone has left: ");
  });
});

io.listen(5000);

app.listen(8800, () => {
  console.log("I Am Ready");
});
