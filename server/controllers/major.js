import { db } from "../db.js";

export const getAllListMajor = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const q = "select * from major";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getListMajorByMaKhoa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maKhoa } = req.params;
  const q = `select * from major where maKhoa = '${maKhoa}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getNameDepartmentByMa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maKhoa } = req.params;
  console.log("maKhoa: ", maKhoa);
  const q = `
  SELECT 
  name as 'tenKhoa'
  FROM 
  department
  WHERE 
  maKhoa = '${maKhoa}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const addMajor = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const newData = req.body;
  const maCN = newData.maCN;
  const q = "select maCN from major where maCN=?";
  db.query(q, [maCN], (err, data) => {
    if (err) return res.status(409).json("Lỗi!");

    if (data.length) return res.status(409).json("Chuyên ngành đã tồn tại");

    const q = "insert into major(maCN, tenCN, maKhoa) values(?)";

    const values = [req.body.maCN, req.body.tenCN, req.body.maKhoa];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(409).json("Lỗi! Vui lòng xem lại các trường");
      return res.status(200).json("Tạo thành công");
    });
  });
};

export const editMajor = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maCNOLD = req.params.maCN;
  const { maCN, tenCN, maKhoa } = req.body;

  const q = `update major set maCN='${maCN}', tenCN='${tenCN}', maKhoa='${maKhoa}' where maCN='${maCNOLD}'`;

  db.query(q, (err, data) => {
    if (err) return res.status(409).json(err);
    return res.status(200).json(data);
  });
};

export const deleteMajor = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maCN } = req.params;

  const q = `update major set isRemoved=TRUE where maCN='${maCN}'`;
  console.log(q);
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
