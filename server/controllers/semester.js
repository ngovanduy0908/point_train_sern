import { db } from "../db.js";

export const getAllListSemester = (req, res) => {
  const q = "select * from semester order by rank asc";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getSemesterOpen = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const q = "select * from semester where status=1 order by rank asc";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const changeSemester = (req, res) => {
  const { maHK } = req.params;
  const { status } = req.body;
  const q = `update semester set status = '${status}' where maHK = '${maHK}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).status(err);
    return res.status(200).json("Thay doi trang thai hoc ki thanh cong");
  });
};

export const addSemester = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const newData = req.body;
  const maHK = newData.maHK;
  const checkSemesterExistence = (maHK) => {
    return new Promise((resolve, reject) => {
      const q = "select maHK from semester where maHK=?";
      db.query(q, [maHK], (err, data) => {
        if (err) return reject(err);
        resolve(data.length > 0);
      });
    });
  };

  const insertSemester = (values) => {
    return new Promise((resolve, reject) => {
      const q = "insert into semester(maHK, name, semester, year) values(?)";
      db.query(q, [values], (err, data) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };

  try {
    const isSemesterExist = await checkSemesterExistence(maHK);
    if (isSemesterExist) {
      res.status(409).json("Hoc ki da ton tai");
    } else {
      await insertSemester([
        req.body.maHK,
        req.body.name,
        req.body.semester,
        req.body.year,
      ]);
      res.status(200).json("Hoc ki da tao thanh cong");
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // const q = "select maHK from semester where maHK=?";
  // db.query(q, [maHK], (err, data) => {
  //   if (err) return res.status(500).json(err);

  //   if (data.length) return res.status(409).json("Hoc ki da ton tai");

  //   const q = "insert into semester(maHK, name, semester, year) values(?)";

  //   const values = [
  //     req.body.maHK,
  //     req.body.name,
  //     req.body.semester,
  //     req.body.year,
  //   ];

  //   db.query(q, [values], (err, data) => {
  //     if (err) return res.status(500).json(err);
  //     return res.status(200).json("Hoc ki da tao thanh cong");
  //   });
  // });
};

export const editSemester = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;

  const updatedData = req.body;
  const q = `update semester set maHK='${updatedData.maHK}', name='${updatedData.name}', semester='${updatedData.semester}', year='${updatedData.year}' where maHK='${maHK}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
};

export const deleteSemester = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maHK = req.params.maHK;

  const q = `delete from semester where maHK = ?`;
  db.query(q, [maHK], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
