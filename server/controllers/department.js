import { db } from '../db.js';

export const getAllListDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const q = 'select * from department';
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  const newData = req.body;
  const maKhoa = newData.maKhoa;
  const q = 'select maKhoa from department where maKhoa=?';
  db.query(q, [maKhoa], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json('Khoa da ton tai');

    const q =
      'insert into department(maKhoa, name, account, password) values(?)';

    const values = [
      req.body.maKhoa,
      req.body.name,
      req.body.account,
      req.body.password,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Khoa da tao thanh cong');
    });
  });
};

export const editDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maKhoa = req.params.maKhoa;

  const updatedData = req.body;
  const q = `update department set maKhoa='${updatedData.maKhoa}', name='${updatedData.name}', account='${updatedData.account}', password='${updatedData.password}' where maKhoa='${maKhoa}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deleteDepartment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');
  const maKhoa = req.params.maKhoa;

  const q = `delete from department where maKhoa = ${maKhoa}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
