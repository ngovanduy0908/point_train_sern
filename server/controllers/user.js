import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'secretKey', (err, tk) => {
    if (err) return res.status(403).json('Token is not valid!');

    const ma = tk.tk;
    let q;
    if (ma.includes('-')) {
      if (req.body.password === '12356@') {
        return res
          .status(404)
          .json('Vui lòng nhập mật khẩu khác mật khẩu mặc định');
      }
      q =
        'update teacher set email = ?, phone_number = ?, password = ? where maGv = ?';
    } else {
      if (req.body.password === '123456') {
        return res
          .status(404)
          .json('Vui lòng nhập mật khẩu khác mật khẩu mặc định');
      }
      q =
        'update students set email = ?, phone_number = ?, password = ? where maSv = ?';
    }
    db.query(
      q,
      [req.body.email, req.body.phone_number, req.body.password, ma],
      (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json('Cập nhập thông tin thành công');
      }
    );
  });
};
