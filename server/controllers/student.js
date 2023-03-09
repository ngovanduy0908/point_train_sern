import { db } from '../db.js';

export const getClassByMaGv = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maGv = req.params.maGv;
  const q = `
  SELECT COUNT(students.maSv) as siso, class.*, course.name AS name_course 
FROM class
LEFT JOIN students ON students.maLop = class.maLop
LEFT JOIN course ON class.maKhoaHoc = course.maKhoaHoc
WHERE class.maGv='${maGv}'
GROUP BY class.maLop;

  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getStudentByMaLop = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maLop = req.params.maLop;
  const q1 = `
  SELECT maSv, name, role_id, maLop FROM students WHERE maLop = '${maLop}';
  `;
  const q2 = `select class_name from class where maLop ='${maLop}'`;
  const q3 = `select * from role`;
  let return_data = {};
  db.query(q1, (err, data) => {
    if (err) return res.status(500).json(err);
    return_data.table1 = data;
    // return res.status(200).json(data);
    db.query(q2, (err, data) => {
      if (err) return res.status(500).json(err);
      return_data.table2 = data;

      db.query(q3, (err, data) => {
        if (err) return res.status(500).json(err);
        return_data.table3 = data;
        return res.status(200).json(return_data);
      });
    });
  });
};

export const getSVByMaSV = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maSv = req.params.maSv;
  const maHK = req.params.maHK;
  const q1 = `
  SELECT 
    students.*, 
    class.class_name as class_name, 
    course.name as course_name,  
    department.name as department_name, 
    role.name as role_name
    from 
    students 
    LEFT JOIN class on students.maLop = class.maLop 
    LEFT JOIN course on class.maKhoaHoc = course.maKhoaHoc 
    LEFT JOIN department on class.maKhoa = department.maKhoa 
    LEFT JOIN role on students.role_id = role.id 
    where maSv = '${maSv}'
  `;

  const q2 = `select * from semester where maHK = '${maHK}'`;
  const return_data = {};
  db.query(q1, (err, data) => {
    if (err) return res.status(500).json(err);
    return_data.table1 = data;

    db.query(q2, (err, data) => {
      if (err) return res.status(500).json(err);
      return_data.table2 = data;
      return res.status(200).json(return_data);
    });
  });
};

export const addStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const maLop = req.params.maLop;
  const newData = req.body;

  const q = 'insert into students(maSv, name, maLop) values(?)';

  const values = [newData.maSv, newData.name, maLop];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json('Student da tao thanh cong');
  });
};

export const updateRole = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const maSv = req.params.maSv;
  const role_id = req.params.role_id;

  const q = `update students set role_id = '${role_id}' where maSv='${maSv}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json('Thay doi chuc vu thanh cong');
  });
};

export const editStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const maSv = req.params.maSv;
  const updatedData = req.body;
  const q = `update students set maSV='${updatedData.maSv}', name='${updatedData.name}' where maSV='${maSv}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json('Thay doi sinh vien thanh cong');
  });
};

export const deleteStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maSv = req.params.maSv;

  const q = `delete from students where maSv = '${maSv}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
