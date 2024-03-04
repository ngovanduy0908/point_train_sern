import { db } from "../db.js";
import moment from "moment";
export const getDeadlineAdmin = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maHK } = req.params;
  // console.log("xg day khong: ", maHK);
  let returnData = {};
  const q =
    "select start_time_student, end_time_student, end_time_monitor, maHK, maAdmin from deadline_admin where maHK = ?";
  db.query(q, [maHK], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log("datane: ", data);
    return res.status(200).json(
      data.length
        ? [
            {
              start_time_student: moment
                .utc(data[0].start_time_student)
                .utcOffset("+0700")
                .format("YYYY-MM-DD"),
              end_time_student: moment
                .utc(data[0].end_time_student)
                .utcOffset("+0700")
                .format("YYYY-MM-DD"),
              end_time_monitor: moment
                .utc(data[0].end_time_monitor)
                .utcOffset("+0700")
                .format("YYYY-MM-DD"),
              maHK: data[0]?.maHK,
              maAdmin: data[0]?.maAdmin,
            },
          ]
        : []
    );
  });
};

export const addDeadlineAdmin = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const { maHK } = req.params;
  const newData = req.body;
  // console.log("body ne: ", req.body);
  const q =
    "insert into deadline_admin(start_time_student, end_time_student, maHK) values(?)";

  const values = [newData.start_time_student, newData.end_time_student, maHK];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deadline da tao thanh cong");
  });
};

export const editDeadlineAdmin = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  // const maGv = req.params.maGv;
  const updatedData = req.body;
  // console.log("xuong day: ", req.body);
  const q = `update deadline_admin set start_time_student='${updatedData.start_time_student}', end_time_student='${updatedData.end_time_student}' where maHK='${updatedData.maHK}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Thay doi thoi gian thanh cong");
  });
};

export const deleteDeadline = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maGv = req.params.maGv;

  const q = `delete from deadline where maGv = '${maGv}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const deadlineWithMaSv = (req, res) => {
  const { maLop } = req.params;
  // console.log("co ma lop: ", maLop);
  const q = `select deadline.* from deadline, teacher, class WHERE deadline.maGv = teacher.maGv and teacher.maGv = class.maGv and class.maLop = '${maLop}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};
