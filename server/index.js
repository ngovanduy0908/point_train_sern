import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import departmentRouter from "./routes/departments.js";
import courseRouter from "./routes/courses.js";
import semesterRouter from "./routes/semesters.js";
import teacherRouter from "./routes/teachers.js";
import classRouter from "./routes/classes.js";
import deadlineRouter from "./routes/deadlines.js";
import studentRouter from "./routes/students.js";
import pointCitizenRouter from "./routes/point_citizens.js";
import pointMediumRouter from "./routes/point_mediums.js";
import pointMarkRouter from "./routes/points.js";
import proofMarkRouter from "./routes/proof_mark.js";
import majorRouter from "./routes/major.js";
import deadlineRouterAdmin from "./routes/deadlines_admin.js";
import pointRouterAdmin from "./routes/point_admin.js";
import deadlineRouterPoint from "./routes/deadlines_point.js";

import { Server } from "socket.io";
import multer from "multer";
import xlsx from "xlsx";
import nodemailer from "nodemailer";
import { db } from "./db.js";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/courses", courseRouter);
app.use("/api/semesters", semesterRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/class", classRouter);
app.use("/api/deadlines", deadlineRouter);
app.use("/api/students", studentRouter);
app.use("/api/point_citizen", pointCitizenRouter);
app.use("/api/point_medium", pointMediumRouter);
app.use("/api/points", pointMarkRouter);
app.use("/api/proof_mark", proofMarkRouter);
app.use("/api/major", majorRouter);
app.use("/api/major", majorRouter);
app.use("/api/deadlines_admin", deadlineRouterAdmin);
app.use("/api/deadlines_point", deadlineRouterPoint);

app.use("/api/point_admin", pointRouterAdmin);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: (req, file, callback) => {
    const randomName = Date.now();
    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const fileName = randomName + "-" + originalName;
    callback(null, fileName); // Tên file được lưu
  },
});
const upload = multer({ storage });

app.post("/api/excel/students/:maLop", upload.single("file"), (req, res) => {
  // if (err) return res.status(500).json(err);
  const maLop = req.params.maLop;
  const file = req.file.path;
  const workbook = xlsx.readFile(file);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  // console.log("datas ne: ", data.length);
  // console.log(maLop);
  for (let i = 1; i <= data.length; i++) {
    const record = data[i];
    // console.log("record: ", record[1]);
    if (record && record[1] !== undefined && record[1] !== null) {
      // console.log("record: ", record);
      const name = `${record[2]} ${record[3]}`;

      // console.log("name: ", name);
      db.query(
        `SELECT maSv FROM students WHERE maSv = '${record[1]}'`,
        (err, data) => {
          if (data.length > 0) {
            db.query("UPDATE students SET name = ?, maLop = ? WHERE maSv = ?", [
              name,
              maLop,
              data[0].maSv,
            ]);
          } else {
            db.query(
              "INSERT INTO students (maSv, name, maLop) VALUES (?, ?, ?)",
              [record[1], name, maLop]
            );
          }
        }
      );
    }
  }
  return res.status(200).json("Thanh cong");
});

app.post(
  "/api/excel/students/diemtuancdsv/:maLop/:maHK",
  upload.single("file"),
  (req, res) => {
    // if (err) return res.status(500).json(err);
    const maLop = req.params.maLop;
    const maHK = req.params.maHK;
    const file = req.file.path;
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    // console.log(data);
    // console.log(maLop);
    for (let i = 1; i < data.length; i++) {
      const record = data[i];
      // console.log(record);
      if (record && record[1] !== undefined && record[1] !== null) {
        const point = record[4];
        db.query(
          `SELECT maSv FROM point_citizen WHERE maSv = '${record[1]}' and maHK='${maHK}'`,
          (err, data) => {
            if (data.length > 0) {
              db.query(
                "UPDATE point_citizen SET point = ?, maHK = ? WHERE maSv = ? and maHK = ?",
                [point, maHK, data[0].maSv, maHK]
              );
            } else {
              db.query(
                "INSERT INTO point_citizen (maSv, maHK, point) VALUES (?, ?, ?)",
                [record[1], maHK, point]
              );
            }
          }
        );
      }
    }
    return res.status(200).json("Thanh cong");
  }
);

app.post(
  "/api/excel/students/diemtbhk/:maLop/:maHK",
  upload.single("file"),
  (req, res) => {
    // if (err) return res.status(500).json(err);
    const maLop = req.params.maLop;
    const maHK = req.params.maHK;
    const file = req.file.path;
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    // console.log(data);
    // console.log(maLop);
    for (let i = 1; i < data.length; i++) {
      const record = data[i];
      // console.log("record: ", record);
      if (record && record[0] !== undefined && record[0] !== null) {
        // console.log("record: ", typeof record[5]);
        const diemTBHK = record[5];
        db.query(
          `SELECT maSv FROM point_medium WHERE maSv = '${record[0]}' and maHK='${maHK}'`,
          (err, data) => {
            if (data.length > 0) {
              db.query(
                "UPDATE point_medium SET point_average = ?, maHK = ? WHERE maSv = ? and maHK = ?",
                [diemTBHK, maHK, data[0].maSv, maHK]
              );
            } else {
              db.query(
                "INSERT INTO point_medium (maSv, maHK, point_average) VALUES (?, ?, ?)",
                [record[0], maHK, diemTBHK]
              );
            }
          }
        );
      }
    }
    return res.status(200).json("Thanh cong");
  }
);

app.post("/api/upload", upload.array("images", 10), (req, res) => {
  // const currentTime = new Date().getTime();
  const uploadedFiles = req.files.map((file) => {
    // const newFileName = `${currentTime}-${file.originalname}`;
    return file.filename;
  });
  // console.log("Uploaded files:", file);

  // You can process the files further or save them to a database

  return res.status(200).json(uploadedFiles);
});

// node mail
// Định cấu hình transporter của nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ngoduy090801@gmail.com",
    pass: "kmwpncrgpjwgbhyr",
  },
});

// API endpoint để gửi email
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, randomNumber, svOrGv } = req.body;
    const checkEmailExis = () => {
      return new Promise((resolve, reject) => {
        let q;
        if (svOrGv === "1") {
          q = `select email from students where email = '${to}'`;
        } else {
          q = `select email from teacher where email = '${to}'`;
        }
        db.query(q, (err, data) => {
          if (err) return reject(err);
          resolve(data.length > 0);
        });
      });
    };
    const updateEmail = () => {
      return new Promise(async (resolve, reject) => {
        const mailOptions = {
          from: "ngoduy090801@gmail.com",
          to,
          subject,
          html: `${text}: <b>${randomNumber}</b>`,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        resolve();

        // res.status(200).json(randomNumber);
      });
    };
    try {
      const isEmailExist = await checkEmailExis();
      if (isEmailExist) {
        res.status(409).json("Email đã tồn tại");
      } else {
        await updateEmail();
        res.status(200).json(randomNumber);
      }
    } catch (error) {
      res.status(500).json(error);
    }
    // console.log("ssser: ", randomNumber);
    // Định cấu hình email options
    // const mailOptions = {
    //   from: "ngoduy090801@gmail.com",
    //   to,
    //   subject,
    //   html: `${text}: <b>${randomNumber}</b>`,
    // };

    // // Gửi email
    // await transporter.sendMail(mailOptions);

    // res.status(200).json(randomNumber);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/forget-pass", async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    // Định cấu hình email options
    const mailOptions = {
      from: "ngoduy090801@gmail.com",
      to,
      subject,
      html: `Mật khẩu mới là: ${text}`,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    const q = `update students set password='${text}' where email='${to}'`;

    // const values = [req.body.maKhoa]

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thay doi sinh vien thanh cong");
    });

    // res.status(200).json("pass");

    // console.log("ssser: ", randomNumber);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
// socket
const io = new Server({
  /* options */
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (maSv, socketId) => {
  // console.log("vao add new user: ", socketId);
  !onlineUsers.some((user) => user.maSv === maSv) &&
    onlineUsers.push({ maSv, socketId });
  // console.log("onlineUsers: ", onlineUsers);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (maSv) => {
  return onlineUsers.find((user) => user.maSv === maSv);
};

io.on("connection", (socket) => {
  // console.log("socket: ", socket.id);
  socket.on("newUser", (user) => {
    addNewUser(user.maSv, socket.id);
    // console.log("vao day di ma, please: ", socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    // console.log("vao day xem ano: ", senderName, receiverName);
    const receiver = getUser(receiverName);
    // console.log("receiver no ti: ", receiverName);
    if (receiver) {
      // console.log("người nhận: ", receiver.socketId);
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        currentTime: Date.now(),
      });
    }
  });

  socket.on("logoutUser", (id) => {
    removeUser(id);
    // console.log("online user logout: ", onlineUsers);
  });

  socket.on("disconnect", () => {
    // removeUser(socket.id);
    console.log("someone has left: ");
  });
});

io.listen(5000);

app.listen(8800, () => {
  console.log("I Am Ready");
});
