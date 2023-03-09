import { db } from '../db.js';

export const getAllListTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

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
  if (!token) return res.status(401).json('Not authenticated');

  const maKhoa = req.params.maKhoa;
  const newData = req.body;
  const maGv = newData.maGv;
  const q = 'select maGv from teacher where maGv=?';
  db.query(q, [maGv], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json('Giao vien da ton tai');

    const q = 'insert into teacher(maGv, name, maKhoa) values(?)';

    const values = [req.body.maGv, req.body.name, maKhoa];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Them giao vien thanh cong');
    });
  });
};

export const editTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maKhoa = req.params.maKhoa;
  const maGv = req.params.maGv;
  const updatedData = req.body;
  const q = `update teacher set maGv='${updatedData.maGv}', name='${updatedData.name}', email='${updatedData.email}', password='${updatedData.password}' where maGv='${maGv}' and maKhoa='${maKhoa}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deleteTeacher = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maGv = req.params.maGv;
  const maKhoa = req.params.maKhoa;
  const q = `delete from teacher where maGv = ? and maKhoa = ?`;
  db.query(q, [maGv, maKhoa], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
