import { db } from '../db.js';

export const getAllListClass = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const maKhoa = req.params.maKhoa;
  const q = `SELECT class.*, teacher.name as teacher_name, course.name as course_name FROM class, teacher, course WHERE class.maKhoaHoc = course.maKhoaHoc and class.maGv = teacher.maGv and class.maKhoa = '${maKhoa}'`;
  const q1 = 'select * from course';
  const q2 = `select * from teacher where maKhoa='${maKhoa}'`;
  let return_data = {};
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return_data.table1 = data;
    // return res.status(200).json(data);
    db.query(q1, (err, data) => {
      if (err) return res.status(500).json(err);
      return_data.table2 = data;

      db.query(q2, (err, data) => {
        if (err) return res.status(500).json(err);
        return_data.table3 = data;
        return res.status(200).json(return_data);
      });
    });
  });
};

export const addClass = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const maKhoa = req.params.maKhoa;
  const newData = req.body;
  const maLop = newData.maLop;
  const q = 'select maLop from class where maLop=?';
  db.query(q, [maLop], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json('Lop da ton tai');

    const q =
      'insert into class(maLop, class_name, maGv, maKhoaHoc, maKhoa) values(?)';

    const values = [
      newData.maLop,
      newData.class_name,
      newData.maGv,
      newData.maKhoaHoc,
      maKhoa,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Them lop thanh cong');
    });
  });
};

export const changeGV = (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json('Not authenticated');

  const maGv = req.params.maGv;
  const maLop = req.params.maLop;
  const q = `update class set maGv = '${maGv}' where maLop='${maLop}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(err).json(err);

    return res.status(200).json('Thay doi giao vien chu nhiem thanh cong');
  });
};

export const changeKhoaHoc = (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json('Not authenticated');

  const maKhoaHoc = req.params.maKhoaHoc;
  const maLop = req.params.maLop;
  const q = `update class set maKhoaHoc = '${maKhoaHoc}' where maLop='${maLop}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(err).json(err);

    return res.status(200).json('Thay doi khoa hoc thanh cong');
  });
};

export const editClass = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maLop = req.params.maLop;

  const updatedData = req.body;
  const q = `update class set maLop='${updatedData.maLop}', class_name='${updatedData.class_name}' where maLop='${maLop}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deleteClass = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maLop = req.params.maLop;
  const maKhoa = req.params.maKhoa;
  const q = `delete from class where maLop = ? and maKhoa = ?`;
  db.query(q, [maLop, maKhoa], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
