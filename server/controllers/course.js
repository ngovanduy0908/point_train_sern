import { db } from '../db.js';

export const getAllListCourse = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const q = 'select * from course';
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addCourse = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const newData = req.body;
  const maKhoaHoc = newData.maKhoaHoc;
  const q = 'select maKhoaHoc from course where maKhoaHoc=?';
  db.query(q, [maKhoaHoc], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json('Khoa hoc da ton tai');

    const q =
      'insert into course(maKhoaHoc, name, start_year, final_year) values(?)';

    const values = [
      req.body.maKhoaHoc,
      req.body.name,
      req.body.start_year,
      req.body.final_year,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Khoa hoc da tao thanh cong');
    });
  });
};

export const editCourse = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maKhoaHoc = req.params.maKhoaHoc;

  const updatedData = req.body;
  const q = `update course set maKhoaHoc='${updatedData.maKhoaHoc}', name='${updatedData.name}', start_year='${updatedData.start_year}', final_year='${updatedData.final_year}' where maKhoaHoc='${maKhoaHoc}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deleteCourse = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maKhoaHoc = req.params.maKhoaHoc;

  const q = `delete from course where maKhoaHoc = ${maKhoaHoc}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
