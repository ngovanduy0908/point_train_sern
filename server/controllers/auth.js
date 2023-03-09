import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const tk = req.body.tk;
  const mk = req.body.mk;
  let q;
  if (tk === 'humg881966') {
    q = 'select * from admin where tk = ? and mk = ?';
  } else if (tk.includes('humg')) {
    q =
      'select department.*, role.name as role_name from department, role where department.role_id = role.id and account = ? and password = ?';
  } else if (tk.includes('-')) {
    q =
      'select teacher.*, role.name as role_name from teacher, role where teacher.role_id = role.id and maGv = ? and password = ?';
  } else {
    q =
      'select students.*, role.name as role_name from students, role where students.role_id = role.id and maSv = ? and password = ?';
  }

  db.query(q, [req.body.tk, req.body.mk], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json('Tai khoan hoac mat khau khong dung!');
    const token = jwt.sign({ tk: tk }, 'secretKey');
    const { ...other } = data[0];
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other, tk: tk, mk: mk });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('User has been logged out.');
};
