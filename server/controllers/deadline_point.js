import { db } from "../db.js";
import moment from "moment";
export const getDeadlinePoint = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const q =
    "select start_time_student_point, end_time_student_point, end_time_monitor_point from deadline_point";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(
      data.length > 0
        ? [
            {
              start_time_student_point: moment
                .utc(data[0].start_time_student_point)
                .utcOffset("+0700")
                .format("YYYY-MM-DD"),
              end_time_student_point: moment
                .utc(data[0].end_time_student_point)
                .utcOffset("+0700")
                .format("YYYY-MM-DD"),
              end_time_monitor_point: moment
                .utc(data[0].end_time_monitor_point)
                .utcOffset("+0700")
                .format("YYYY-MM-DD"),
            },
          ]
        : []
    );
  });
};
export const getDeadlineCheckPoint = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const q =
    "select start_time_student_point, end_time_student_point, end_time_monitor_point from deadline_point";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(...data);
  });
};

export const addDeadlinePoint = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  const {
    start_time_student_point,
    end_time_student_point,
    end_time_monitor_point,
  } = req.body;
  // console.log("body ne: ", req.body);
  const q = `insert into deadline_point
    (start_time_student_point, end_time_student_point, end_time_monitor_point) 
    values
    ('${start_time_student_point}', '${end_time_student_point}', '${end_time_monitor_point}')`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deadline da tao thanh cong");
  });
};

export const editDeadlinePoint = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  const updatedData = req.body;
  // console.log("updatedData: ", updatedData);
  const q = `update deadline_point
  set
  start_time_student_point='${updatedData.start_time_student_point}',
  end_time_student_point='${updatedData.end_time_student_point}',
  end_time_monitor_point='${updatedData.end_time_monitor_point}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Thay doi thoi gian thanh cong");
  });
};

export const deleteDeadlinePoint = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");
  // console.log("xuong delete nao");
  const q = `delete from deadline_point`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

// export const deadlineWithMaSv = (req, res) => {
//   const { maLop } = req.params;
//   // console.log("co ma lop: ", maLop);
//   const q = `select deadline.* from deadline, teacher, class WHERE deadline.maGv = teacher.maGv and teacher.maGv = class.maGv and class.maLop = '${maLop}'`;
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);

//     return res.status(200).json(...data);
//   });
// };
