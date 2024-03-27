import { db } from "../db.js";

export const getAllPointCitizenByMa = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maLop = req.params.maLop;
  const maHK = req.params.maHK;

  const q = `
  SELECT students.*, point_citizen.point FROM students LEFT JOIN point_citizen on students.maSv = point_citizen.maSv WHERE maHK = '${maHK}' and students.maLop = '${maLop}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(err).json(err);
    // console.log("data: ", data);
    return res.status(200).json(data);
  });
};

export const addPointCitizen = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;
  const newData = req.body;
  const q1 = `SELECT maSv FROM students WHERE maSv = '${newData.maSv}'`;
  db.query(q1, (err, data) => {
    if (err) return res.status(409).json(err);
    if (data.length > 0) {
      const q = `
      select point_citizen.maSv from point_citizen, students
       where point_citizen.maSv = students.maSv 
       and (point_citizen.maHK=? 
       and point_citizen.maSv=? or students.maSv=? and students.maLop!=?)
      `;
      db.query(
        q,
        [maHK, newData.maHK, newData.maSv, newData.maLop],
        async (err, data) => {
          if (err) return res.status(409).json(err);

          if (data.length)
            return res
              .status(409)
              .json("Mã sinh viên này đã tồn tại điểm Tuần CDSV");

          const q = "insert into point_citizen(maSv, maHK, point) values(?)";

          const values = [newData.maSv, maHK, newData.point];

          db.query(q, [values], (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json("Diem tuan CDSV da thanh cong");
          });
        }
      );
    } else {
      return res.status(409).json("Không tồn tại sinh viên");
    }
  });
};

export const editPointCitizen = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;

  const updatedData = req.body;
  const q = `update point_citizen set point='${updatedData.point}' where maSv='${updatedData.maSv}' and maHK='${maHK}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deletePointCitizen = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;
  const maSv = req.params.maSv;
  const q = `delete from point_citizen where maSv = '${maSv}' and maHK ='${maHK}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
