import { db } from "../db.js";

export const getClassByMaGv = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
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
  if (!token) return res.status(401).json("Not authenticated");
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
  if (!token) return res.status(401).json("Not authenticated");
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
  if (!token) return res.status(401).json("Not authenticated");

  const maLop = req.params.maLop;
  const newData = req.body;

  const q = "insert into students(maSv, name, maLop) values(?)";

  const values = [newData.maSv, newData.name, maLop];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Student da tao thanh cong");
  });
};

export const updateRole = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maSv, role_id } = req.params;
  const { maLop } = req.query;
  if (Number(role_id) === 3) {
    const checkMonitor = `SELECT maSv FROM students WHERE maLop='${maLop}' and role_id = 3 and maSv != '${maSv}'`;
    db.query(checkMonitor, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) {
        return res.status(409).json("Lớp đã tồn tại lớp trưởng.");
      } else {
        const q = `update students set role_id = '${role_id}' where maSv='${maSv}'`;
        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Thay doi chuc vu thanh cong");
        });
      }
    });
  } else {
    const q = `update students set role_id = '${role_id}' where maSv='${maSv}'`;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Thay doi chuc vu thanh cong");
    });
  }
};

export const editStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maSv = req.params.maSv;
  const updatedData = req.body;
  const q = `update students set maSV='${updatedData.maSv}', name='${updatedData.name}' where maSV='${maSv}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Thay doi sinh vien thanh cong");
  });
};

export const deleteStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maSv = req.params.maSv;

  const q = `delete from students where maSv = '${maSv}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getInfoForPhieuDiem = (req, res) => {
  // console.log("xuong day: ", req.query);
  const { maHK, maSv } = req.query;
  const q = `
  SELECT 
  semester.semester AS 'ki', 
  semester.maHK AS 'ma_hk', 
  semester.year AS 'nam_hoc', 
  course.name AS 'ten_lop', 
  department.name AS 'khoa', 
  course.name AS 'khoa_hoc', 
  point.*, 
  point_student.*, 
  point_monitor.*, 
  point_teacher.* 
  FROM 
  students 
  INNER JOIN class ON students.maLop = class.maLop 
  INNER JOIN course ON class.maKhoaHoc = course.maKhoaHoc 
  INNER JOIN department ON class.maKhoa = department.maKhoa 
  INNER JOIN semester ON semester.maHK = '${maHK}' 
  LEFT JOIN point ON students.maSv = point.maSv AND 
  point.maHK = semester.maHK 
  LEFT JOIN point_student ON students.maSv = point_student.maSv AND 
  point_student.maHK = semester.maHK 
  LEFT JOIN point_monitor ON students.maSv = point_monitor.maSv AND 
  point_monitor.maHK = semester.maHK 
  LEFT JOIN point_teacher ON students.maSv = point_teacher.maSv AND 
  point_teacher.maHK = semester.maHK 
  WHERE 
  students.maSv = '${maSv}';
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(...data);
  });
};

export const getManyInfo = (req, res) => {
  const { maSv } = req.query;
  const q = `
  SELECT 
  class.maLop, 
  class.class_name as 'tenLop', 
  department.name as 'tenKhoa', 
  teacher.name as 'tenGV' 
  FROM 
  students, 
  class, 
  teacher, 
  department 
  WHERE 
  students.maLop = class.maLop and 
  class.maGv = teacher.maGv and 
  teacher.maKhoa = department.maKhoa and 
  students.maSv = '${maSv}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(...data);
  });
};

export const changeInfoEmail = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  // const maSv = req.params.maSv;
  const { maGv, maSv, svOrGv } = req.query;
  const { email } = req.body;
  const checkEmailExis = () => {
    return new Promise((resolve, reject) => {
      let q;
      if (svOrGv === "1") {
        q = `select email from students where email = '${email}'`;
      } else {
        q = `select email from teacher where email = '${email}'`;
      }
      db.query(q, (err, data) => {
        if (err) return reject(err);
        resolve(data.length > 0);
      });
    });
  };
  const updateEmail = () => {
    return new Promise((resolve, reject) => {
      let q;
      if (svOrGv === "1") {
        q = `update students set email='${email}' where maSV='${maSv}'`;
      } else {
        q = `update teacher set email='${email}' where maGv='${maGv}'`;
      }
      // const values = [req.body.maKhoa]

      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        resolve();
        // return res.status(200).json("Thay doi sinh vien thanh cong");
      });
    });
  };
  try {
    const isEmailExist = await checkEmailExis();
    if (isEmailExist) {
      res.status(409).json("Email đã tồn tại");
    } else {
      await updateEmail();
      res.status(200).json("Thay đổi thông tin email thành công");
    }
  } catch (error) {
    res.status(500).json(error);
  }
  // let q;
  // if (svOrGv === "1") {
  //   q = `update students set email='${email}' where maSV='${maSv}'`;
  // } else {
  //   q = `update teacher set email='${email}' where maGv='${maGv}'`;
  // }
  // // const values = [req.body.maKhoa]

  // db.query(q, (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   return res.status(200).json("Thay doi sinh vien thanh cong");
  // });
};

export const changeInfoPhone = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  // const maSv = req.params.maSv;
  const { maGv, maSv, svOrGv } = req.query;
  const { phone } = req.body;

  let q;
  if (svOrGv === "1") {
    q = `update students set phone_number='${phone}' where maSV='${maSv}'`;
  } else {
    q = `update teacher set phone_number='${phone}' where maGv='${maGv}'`;
  }
  // const values = [req.body.maKhoa]

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Thay doi sinh vien thanh cong");
  });
};
