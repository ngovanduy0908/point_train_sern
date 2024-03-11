import { db } from "../db.js";

export const getPointStudent = (req, res) => {
  // console.log("xuong day: ", req.query);
  const { maHK } = req.params;
  const q = `select 
    students.*, point.* 
    from 
    students, point 
    where 
    students.maSv = point.maSv and 
    point.maHK = '${maHK}' and 
    (point.status_teacher = '1' and 
    point.point_teacher >= 0 and 
    point.point_teacher < 50 or 
    point.status_admin = '1')`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
