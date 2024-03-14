import { db } from "../db.js";

export const getAllPointMediumByMa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const { maLop, maHK } = req.params;
  const q = `
  SELECT students.*, point_medium.point_average	 FROM students LEFT JOIN point_medium on students.maSv = point_medium.maSv WHERE maHK = '${maHK}' and students.maLop = '${maLop}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(err).json(err);

    return res.status(200).json(data);
  });
};

export const addPointMedium = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;
  const newData = req.body;
  // console.log("newdara: ", newData);
  // const q1 = `SELECT maSv FROM students WHERE maLop != '${newData.maLop}'`
  const q = `select point_medium.maSv from point_medium, students
   where point_medium.maSv = students.maSv 
   and (point_medium.maHK=? 
   and point_medium.maSv=? or students.maSv=? and students.maLop!=?)
   `;
  db.query(
    q,
    [maHK, newData.maSv, newData.maSv, newData.maLop],
    (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length)
        return res.status(409).json("Mã sinh viên này đã tồn tại điểm TBHK");

      const q = "insert into point_medium(maSv, maHK, point_average) values(?)";

      const values = [newData.maSv, maHK, newData.point];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Diem TBHK da thanh cong");
      });
    }
  );
};

export const editPointMedium = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;

  const updatedData = req.body;
  const q = `update point_medium set point_average='${updatedData.point_average}' where maSv='${updatedData.maSv}' and maHK='${maHK}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deletePointMedium = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;
  const maSv = req.params.maSv;
  const q = `delete from point_medium where maSv = '${maSv}' and maHK ='${maHK}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
