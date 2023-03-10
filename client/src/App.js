import './App.scss';

import { AuthContext } from './context/authContext';
import Login from './pages/login/Login';
import ChangeInfoOne from './pages/login/ChangeInfoOne';

// import Khoa from './pages/khoa/Khoa';
import { useContext, useMemo } from 'react';

import SV from './pages/sv/SV';
import { themeSettings } from './theme.js';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material';

import LayoutAdmin from './components/layout/LayoutAdmin';
import LayoutKhoa from './components/layout/LayoutKhoa';
import LayoutGV from './components/layout/LayoutGV';
import LayoutLT from './components/layout/LayoutLT';

import LayoutSV from './components/layout/LayoutSV';

import QuanLyKhoa from './components/admin/QuanLyKhoa';
import QuanLyKhoaHoc from './components/admin/QuanLyKhoaHoc';
import QuanLyHocKi from './components/admin/QuanLyHocKi';
import Overview from './components/admin/Overview';
import QuanLyGiaoVien from './components/department/QuanLyGiaoVien';
import QuanLyLopHoc from './components/department/QuanLyLopHoc';
import ThongKeDRL from './components/department/ThongKeDRL';
import QuanLyThoiGian from 'components/teacher/QuanLyThoiGian';
import QuanLyLopChuNhiem from 'components/teacher/QuanLyLopChuNhiem';
import QuanLyHocSinh from 'components/teacher/QuanLyHocSinh';
import QuanLyDiemCDSV from 'components/teacher/QuanLyDiemCDSV';
import QuanLyDiemTBHK from 'components/teacher/QuanLyDiemTBHK';
import LT from 'pages/lt/LT';
import PhieuChamDiem from 'components/student/PhieuChamDiem';
import Mark from 'components/student/Mark';

function App() {
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    var tk = currentUser.tk;
    var mk = currentUser.mk;
  }
  const setupRoute = () => {
    if (tk === 'humg881966') {
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
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (tk.includes('humg')) {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              element={<LayoutKhoa theme={theme} currentUser={currentUser} />}
            >
              <Route path="/" element={<Navigate to="/overview" />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/quanlygiaovien" element={<QuanLyGiaoVien />} />
              <Route path="/quanlylophoc" element={<QuanLyLopHoc />} />
              <Route path="/thongkedrl" element={<ThongKeDRL />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (tk.includes('-')) {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              element={<LayoutGV currentUser={currentUser} theme={theme} />}
            >
              <Route
                path="/"
                element={
                  mk === '12356@' ? (
                    <Navigate to="/change-info" />
                  ) : (
                    <Navigate to="/overview" />
                  )
                }
              />
              <Route path="/overview" element={<Overview />} />
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
                path="/quanlylopchunhiem/uploadfilecdsv/:maLop/:maHK"
                element={<QuanLyDiemCDSV />}
              />

              <Route
                path="/quanlylopchunhiem/uploadfiletbhk/:maLop/:maHK"
                element={<QuanLyDiemTBHK />}
              />
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
                element={<LayoutLT currentUser={currentUser} theme={theme} />}
              >
                <Route
                  path="/"
                  element={
                    mk === '123456' ? <Navigate to="/change-info" /> : <LT />
                  }
                />
                <Route path="/" element={<LT />} />
              </Route>
            ) : (
              <Route
                element={<LayoutSV currentUser={currentUser} theme={theme} />}
              >
                <Route
                  path="/"
                  element={
                    mk === '123456' ? (
                      <Navigate to="/change-info" />
                    ) : (
                      <Navigate to="/home" replace />
                    )
                  }
                />
                <Route path="/home" element={<SV />} />
                <Route path="/chamdiemrenluyen" element={<PhieuChamDiem />} />
                <Route path="/chamdiemrenluyen/:maHK" element={<Mark />} />
              </Route>
            )}
            {/* <Route
              element={<LayoutSV currentUser={currentUser} theme={theme} />}
            >
              <Route
                path="/"
                element={
                  mk === '123456' ? <Navigate to="/change-info" /> : <SV />
                }
              />
              <Route path="/" element={<SV />} />
            </Route> */}
            <Route path="/change-info" element={<ChangeInfoOne />} />
            <Route path="/login" element={<Login />} />
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
