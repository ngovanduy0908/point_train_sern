import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import departmentRouter from './routes/departments.js';
import courseRouter from './routes/courses.js';
import semesterRouter from './routes/semesters.js';
import teacherRouter from './routes/teachers.js';
import classRouter from './routes/classes.js';
import deadlineRouter from './routes/deadlines.js';
import studentRouter from './routes/students.js';
import pointCitizenRouter from './routes/point_citizens.js';
import pointMediumRouter from './routes/point_mediums.js';

import multer from 'multer';
import xlsx from 'xlsx';
import { db } from './db.js';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/courses', courseRouter);
app.use('/api/semesters', semesterRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/class', classRouter);
app.use('/api/deadlines', deadlineRouter);
app.use('/api/students', studentRouter);
app.use('/api/point_citizen', pointCitizenRouter);
app.use('/api/point_medium', pointMediumRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post('/api/excel/students/:maLop', upload.single('file'), (req, res) => {
  // if (err) return res.status(500).json(err);
  const maLop = req.params.maLop;
  const file = req.file.path;
  const workbook = xlsx.readFile(file);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  // console.log(data);
  // console.log(maLop);
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    console.log(record);
    db.query(
      `SELECT maSv FROM students WHERE maSv = '${record[0]}'`,
      (err, data) => {
        if (data.length > 0) {
          db.query('UPDATE students SET name = ?, maLop = ? WHERE maSv = ?', [
            record[1],
            maLop,
            data[0].maSv,
          ]);
        } else {
          db.query(
            'INSERT INTO students (maSv, name, maLop) VALUES (?, ?, ?)',
            [record[0], record[1], maLop]
          );
        }
      }
    );
  }
});

app.post(
  '/api/excel/students/diemtuancdsv/:maLop/:maHK',
  upload.single('file'),
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
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      // console.log(record);
      db.query(
        `SELECT maSv FROM point_citizen WHERE maSv = '${record[0]}' and maHK='${maHK}'`,
        (err, data) => {
          if (data.length > 0) {
            db.query(
              'UPDATE point_citizen SET point = ?, maHK = ? WHERE maSv = ? and maHK = ?',
              [record[1], maHK, data[0].maSv, maHK]
            );
          } else {
            db.query(
              'INSERT INTO point_citizen (maSv, maHK, point) VALUES (?, ?, ?)',
              [record[0], maHK, record[1]]
            );
          }
        }
      );
    }
  }
);

app.post(
  '/api/excel/students/diemtbhk/:maLop/:maHK',
  upload.single('file'),
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
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      // console.log(record);
      db.query(
        `SELECT maSv FROM point_medium WHERE maSv = '${record[0]}' and maHK='${maHK}'`,
        (err, data) => {
          if (data.length > 0) {
            db.query(
              'UPDATE point_medium SET point_average = ?, maHK = ? WHERE maSv = ? and maHK = ?',
              [record[1], maHK, data[0].maSv, maHK]
            );
          } else {
            db.query(
              'INSERT INTO point_medium (maSv, maHK, point_average) VALUES (?, ?, ?)',
              [record[0], maHK, record[1]]
            );
          }
        }
      );
    }
  }
);

app.listen(8800, () => {
  console.log('Connected');
});
