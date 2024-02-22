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
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json("Chuyên ngành đã tồn tại");

    const q = "insert into major(maCN, tenCN, maKhoa) values(?)";

    const values = [req.body.maCN, req.body.tenCN, req.body.maKhoa];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Tạo thành công");
    });
  });
};

export const editMajor = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maCNOLD = req.params.maCN;
  const { maCN, tenCN, maKhoa } = req.body;
  // console.log("req.body: ", req.body);
  // console.log("maCNOLD: ", maCNOLD);
  // const checkMaCNExis = () => {
  //   return new Promise((resolve, reject) => {
  //     const q = `select maCN from major where maCN = '${maCN}' and isRemoved = false`;
  //     db.query(q, (err, data) => {
  //       if (err) return reject(err);
  //       resolve(data.length > 0);
  //     });
  //   });
  // };
  // const updateMajor = () => {
  //   return new Promise((resolve, reject) => {
  //     const q = `update major set maCN='${maCN}', tenCN='${tenCN}', maKhoa=${maKhoa} where maCN='${maCNOLD}'`;
  //     // const values = [req.body.maKhoa]
  //     db.query(q, (err, data) => {
  //       if (err) return res.status(500).json(err);
  //       resolve();

  //       // return res.status(200).json(data);
  //     });
  //   });
  // };

  // try {
  //   const isMaCNExist = await checkMaCNExis();
  //   if (isMaCNExist) {
  //     res.status(409).json("Mã chuyên ngành đã tồn tại");
  //   } else {
  //     await updateMajor();
  //     res.status(200).json("Thay đổi thông tin thành công");
  //   }
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  const q = `update major set maCN='${maCN}', tenCN='${tenCN}', maKhoa='${maKhoa}' where maCN='${maCNOLD}'`;
  // const values = [req.body.maKhoa]
  // console.log(q);
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log("data: ", data);
    return res.status(200).json(data);
  });
  // const ma = req.body.maKhoa;
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
