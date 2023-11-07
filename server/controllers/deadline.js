import { db } from "../db.js";
import moment from "moment";
export const getDeadline = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maGv = req.params.maGv;
  let returnData = {};
  const q =
    "select start_time_student, end_time_student, end_time_monitor from deadline where maGv = ?";
  db.query(q, [maGv], (err, data) => {
    if (err) return res.status(500).json(err);

    // returnData.start_time_student = moment
    //   .utc(data[0].start_time_student)
    //   .utcOffset('+0700')
    //   .format('YYYY-MM-DD');
    // returnData.end_time_student = moment
    //   .utc(data[0].end_time_student)
    //   .utcOffset('+0700')
    //   .format('YYYY-MM-DD');
    // returnData.end_time_monitor = moment
    //   .utc(data[0].end_time_monitor)
    //   .utcOffset('+0700')
    //   .format('YYYY-MM-DD');

    return res.status(200).json([
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
      },
    ]);
  });
};

export const addDeadline = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const maGv = req.params.maGv;

  const newData = req.body;

  const q =
    "insert into deadline(maGv, start_time_student, end_time_student, end_time_monitor) values(?)";

  const values = [
    maGv,
    newData.start_time_student,
    newData.end_time_student,
    newData.end_time_monitor,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deadline da tao thanh cong");
  });
};

export const editDeadline = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const maGv = req.params.maGv;

  const updatedData = req.body;
  const q = `update deadline set start_time_student='${updatedData.start_time_student}', end_time_student='${updatedData.end_time_student}', end_time_monitor='${updatedData.end_time_monitor}' where maGv='${maGv}'`;
  // const values = [req.body.maKhoa]
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Thay doi thoi gian thanh cong");
  });
  // const ma = req.body.maKhoa;
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
  const maLop = req.params.maLop;
  console.log("maLop: ", maLop);
};
