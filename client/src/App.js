import "./App.scss";
import { AuthContext } from "./context/authContext";
import Login from "./pages/login/Login";
import ChangeInfoOne from "./pages/login/ChangeInfoOne";
// import Khoa from './pages/khoa/Khoa';
import { useContext, useEffect, useMemo, useState } from "react";
import SV from "./pages/sv/SV";
import { themeSettings } from "./theme.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material";

import LayoutAdmin from "./components/layout/LayoutAdmin";
import LayoutKhoa from "./components/layout/LayoutKhoa";
import LayoutGV from "./components/layout/LayoutGV";
import LayoutLT from "./components/layout/LayoutLT";

import LayoutSV from "./components/layout/LayoutSV";

import QuanLyKhoa from "./components/admin/QuanLyKhoa";
import QuanLyKhoaHoc from "./components/admin/QuanLyKhoaHoc";
import QuanLyHocKi from "./components/admin/QuanLyHocKi";
import Overview from "./components/admin/Overview";
import QuanLyGiaoVien from "./components/department/QuanLyGiaoVien";
import QuanLyLopHoc from "./components/department/QuanLyLopHoc";
import ThongKeDRL from "./components/department/ThongKeDRL";
import QuanLyThoiGian from "components/teacher/QuanLyThoiGian";
import QuanLyLopChuNhiem from "components/teacher/QuanLyLopChuNhiem";
import QuanLyHocSinh from "components/teacher/QuanLyHocSinh";
import QuanLyDiemCDSV from "components/teacher/QuanLyDiemCDSV";
import QuanLyDiemTBHK from "components/teacher/QuanLyDiemTBHK";
import PhieuChamDiem from "components/student/PhieuChamDiem";
import Mark from "components/student/Mark";
import AfterMark from "components/student/AfterMark";
import TestChart from "components/monitor/TestChart";
import ChartDetail from "pages/chart/ChartDetail";
import Luckysheet from "components/Luckysheet";
import GenerateDocument from "components/monitor/GenerateDocument ";
import XetDiemRenLuyen from "pages/lt/XetDiemRenLuyen";
import DanhSachDRLSinhVien from "pages/lt/DanhSachDRLSinhVien";
import DanhSachDiemRenLuyenLT from "pages/gv/DanhSachDiemRenLuyenLT";
import { io } from "socket.io-client";
import DanhSachDRL from "pages/sv/DanhSachDRL";
import BlankFilePdf from "pages/sv/BlankFilePdf";
import BlankFileProof from "pages/sv/BlankFileProof";
import OverviewDepartment from "components/department/OverviewDepartment";
import ExportExcelGV from "pages/gv/ExportExcelGV";
import OverviewSV from "components/student/Overview";
import OverviewGV from "components/teacher/OverviewGV";
import ExportExcelLT from "pages/lt/ExportExcelLT";
import QuanLyChuyenNganh from "components/admin/QuanLyChuyenNganh";
import SinhHoatBoSung from "pages/admin/SinhHoatBoSung";
import SinhHoatBoSungDetail from "pages/admin/SinhHoatBoSungDetail";
const IO = process.env.REACT_APP_IO;
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketIo = io(`${IO}`);
    // setSocket(io(`${IO}`));
    setSocket(socketIo);
    // console.log("current user ban đầu: ", currentUser);
    if (currentUser) {
      // console.log("current user tôn tai: ", currentUser);
      socketIo.emit("newUser", currentUser);
    }
  }, [currentUser]);

  if (currentUser) {
    var tk = currentUser.tk;
    var mk = currentUser.mk;
  }
  const setupRoute = () => {
    if (tk === "humg881966") {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              element={<LayoutAdmin theme={theme} currentUser={currentUser} />}
            >
              <Route path="/" element={<Navigate to="/overview" />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/quanlykhoa" element={<QuanLyKhoa />} />
              <Route path="/quanlykhoahoc" element={<QuanLyKhoaHoc />} />
              <Route path="/quanlyhocki" element={<QuanLyHocKi />} />
              <Route path="/sinhhoatbosung" element={<SinhHoatBoSung />} />
              <Route
                path="/sinhhoatbosung/:maHK"
                element={<SinhHoatBoSungDetail />}
              />

              <Route
                path="/quanlychuyennganh"
                element={<QuanLyChuyenNganh />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (tk?.includes("humg")) {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              element={<LayoutKhoa theme={theme} currentUser={currentUser} />}
            >
              <Route path="/" element={<Navigate to="/overview" />} />
              <Route path="/overview" element={<OverviewDepartment />} />
              <Route path="/quanlygiaovien" element={<QuanLyGiaoVien />} />
              <Route path="/quanlylophoc" element={<QuanLyLopHoc />} />
              <Route path="/thongkedrl" element={<ThongKeDRL />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (tk?.includes("-")) {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              element={<LayoutGV currentUser={currentUser} theme={theme} />}
            >
              <Route
                path="/"
                element={
                  mk === "12356@" ? (
                    <Navigate to="/change-info" />
                  ) : (
                    <Navigate to="/overview" />
                  )
                }
              />
              <Route path="/overview" element={<OverviewGV />} />
              <Route path="/quanlythoigian" element={<QuanLyThoiGian />} />

              <Route
                path="/quanlylopchunhiem"
                element={<QuanLyLopChuNhiem />}
              />

              <Route
                path="/quanlylopchunhiem/:maLop"
                element={<QuanLyHocSinh />}
              />

              <Route
                path="/quanlylopchunhiem/:maLop/:maHK"
                element={<DanhSachDiemRenLuyenLT />}
              />

              <Route
                path="/quanlylopchunhiem/uploadfilecdsv/:maLop/:maHK"
                element={<QuanLyDiemCDSV />}
              />

              <Route
                path="/quanlylopchunhiem/uploadfiletbhk/:maLop/:maHK"
                element={<QuanLyDiemTBHK />}
              />
              <Route path="/exportexcelgv" element={<ExportExcelGV />} />
            </Route>

            <Route path="/change-info" element={<ChangeInfoOne />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            {currentUser.role_id === 3 ? (
              <Route
                element={
                  <LayoutLT
                    socket={socket}
                    currentUser={currentUser}
                    theme={theme}
                  />
                }
              >
                <Route
                  path="/"
                  element={
                    mk === "123456" ? (
                      <Navigate to="/change-info" />
                    ) : (
                      <Navigate to="/home" replace />
                    )
                  }
                />
                <Route path="/home" element={<DanhSachDRL />} />
                <Route path="/xetdiemrenluyen" element={<XetDiemRenLuyen />} />
                <Route path="/exportexcellt" element={<ExportExcelLT />} />

                <Route
                  path="/xetdiemrenluyen/:maHK"
                  element={<DanhSachDRLSinhVien socket={socket} />}
                />

                <Route path="/chamdiemrenluyen" element={<PhieuChamDiem />} />

                <Route
                  path="/chamdiemrenluyen/:maHK/after_mark"
                  element={<AfterMark />}
                />
                <Route path="/chamdiemrenluyen/:maHK" element={<Mark />} />
                <Route path="/exportexcellt" element={<ExportExcelLT />} />
              </Route>
            ) : (
              <Route
                element={
                  <LayoutSV
                    socket={socket}
                    currentUser={currentUser}
                    theme={theme}
                  />
                }
              >
                <Route
                  path="/"
                  element={
                    mk === "123456" ? (
                      <Navigate to="/change-info" />
                    ) : (
                      <Navigate to="/home" replace />
                    )
                  }
                />
                <Route path="/home" element={<DanhSachDRL />} />
                <Route path="/chamdiemrenluyen" element={<PhieuChamDiem />} />
                <Route
                  path="/chamdiemrenluyen/:maHK/after_mark"
                  element={<AfterMark />}
                />
                <Route path="/chamdiemrenluyen/:maHK" element={<Mark />} />
                <Route path="/xemdiemrenluyen" element={<DanhSachDRL />} />
              </Route>
            )}
            <Route
              element={
                <LayoutSV
                  socket={socket}
                  currentUser={currentUser}
                  theme={theme}
                />
              }
            >
              <Route
                path="/"
                element={
                  mk === "123456" ? (
                    <Navigate to="/change-info" />
                  ) : (
                    <DanhSachDRL />
                  )
                }
              />
              <Route path="/" element={<OverviewSV />} />
              <Route path="/xemdiemrenluyen" element={<DanhSachDRL />} />
            </Route>
            <Route path="/change-info" element={<ChangeInfoOne />} />
            <Route path="/login" element={<Login socket={socket} />} />
            <Route path="/chart" element={<TestChart />} />
            <Route path="/chart/detail" element={<ChartDetail />} />
            <Route path="/excel" element={<Luckysheet />} />
            <Route path="/word" element={<GenerateDocument />} />
            <Route path="/print-pdf/:maHK" element={<BlankFilePdf />} />
            <Route path="/print-proof/:maHK" element={<BlankFileProof />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };

  return (
    <div className="app">
      {currentUser ? (
        setupRoute()
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login socket={socket} />} />
            <Route path="/chart" element={<TestChart />} />
            <Route path="/chart/detail" element={<ChartDetail />} />
            <Route path="/excel" element={<Luckysheet />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
