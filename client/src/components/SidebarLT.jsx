// import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FilePresentIcon from "@mui/icons-material/FilePresent";

import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import { formatDay } from "utils/formatDay";
import { getDeadlineBySinhVien } from "utils/getDetails/getDealineBySinhVien";
import { AuthContext } from "context/authContext";
import Countdown from "./countdown/CountDown";
import { getAllDeadlineAdmin } from "utils/getMany/getDealineAdmin";

const navItemsLT = [
  {
    text: "Trang Chủ",
    icon: <ApartmentOutlinedIcon />,
    path: "home",
  },

  {
    text: "Xuất Báo Cáo",
    icon: <FilePresentIcon />,
    path: "exportexcellt",
  },
];

const SidebarLT = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { currentUser, handleSetMaHKAdmin } = useContext(AuthContext);

  const { pathname } = useLocation();
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();
  const theme = useTheme();

  const [navList, setNavList] = useState(navItemsLT);
  const [timeStartStudentMark, setTimeStartStudentMark] = useState(null);
  const [timeEndStudentMark, setTimeEndStudentMark] = useState(null);
  const [timeEndMonitorMark, setTimeEndMonitorMark] = useState(null);
  const [timeStartStudentMarkAdmin, setTimeStartStudentMarkAdmin] =
    useState(null);
  const [timeEndStudentMarkAdmin, setTimeEndStudentMarkAdmin] = useState(null);
  const [checkTimePoint, setCheckTimePoint] = useState(false);
  const [checkTimeMark, setCheckTimeMark] = useState(false);
  const curDate = new Date();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const getDeadlineByMaLop = async () => {
    try {
      const [res, resAdmin] = await Promise.all([
        getDeadlineBySinhVien(currentUser.maLop),
        getAllDeadlineAdmin(),
      ]);
      setTimeStartStudentMark(res.start_time_student);
      setTimeEndStudentMark(res.end_time_student);
      setTimeEndMonitorMark(res.end_time_monitor);
      setTimeEndMonitorMark(res.end_time_monitor);
      if (resAdmin?.end_time_student) {
        setTimeEndStudentMark(resAdmin?.end_time_student);
      }
      setTimeStartStudentMarkAdmin(resAdmin?.start_time_student);
      setTimeEndStudentMarkAdmin(resAdmin?.end_time_student);
      // setMaHKAdmin(resAdmin?.maHK);
      handleSetMaHKAdmin(resAdmin?.maHK);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDeadlineByMaLop();
  }, []);

  useEffect(() => {
    const a = formatDay(curDate) >= formatDay(timeStartStudentMark);
    const b = formatDay(curDate) <= formatDay(timeEndStudentMark);
    const c = formatDay(curDate) > formatDay(timeEndStudentMark);
    const d = formatDay(curDate) <= formatDay(timeEndMonitorMark);
    const e = formatDay(curDate) >= formatDay(timeStartStudentMarkAdmin);
    const f = formatDay(curDate) <= formatDay(timeEndStudentMarkAdmin);
    if (c && d) {
      setCheckTimeMark(true);
      const isChamDiemRenLuyenExists = navItemsLT.some(
        (item) => item.path === "xetdiemrenluyen"
      );

      if (!isChamDiemRenLuyenExists) {
        const newNavItem = {
          text: "Xét Điểm Rèn Luyện",
          icon: <PlaylistAddCheckIcon />,
          path: "xetdiemrenluyen",
        };
        setNavList((prev) => [...prev, newNavItem]);
      }
    } else {
      setCheckTimePoint(false);
      setNavList((prev) => [...prev]);
    }
    if ((a && b) || (e && f)) {
      setCheckTimePoint(true);
      const isChamDiemRenLuyenExists = navItemsLT.some(
        (item) => item.path === "chamdiemrenluyen"
      );

      if (!isChamDiemRenLuyenExists) {
        const newNavItem = {
          text: "Chấm Điểm Rèn Luyện",
          icon: <BorderColorIcon />,
          path: "chamdiemrenluyen",
        };
        setNavList((prev) => [...prev, newNavItem]);
      }
    } else {
      setCheckTimePoint(false);
      setNavList((prev) => [...prev]);
    }
  }, [timeStartStudentMark, timeEndStudentMark]);

  return (
    <Box component="nav" className="z-0">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    MỎ - ĐỊA CHẤT
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navList.map(({ text, icon, path }) => {
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${path}`);
                        setActive(`${path}`);
                      }}
                      sx={{
                        backgroundColor: active.includes(path)
                          ? theme.palette.secondary[300]
                          : "transparent",
                        color: active.includes(path)
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === path
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === path && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
              {user && checkTimePoint && (
                <Countdown timeEndStudentMark={timeEndStudentMark} />
              )}
              {user && checkTimeMark && (
                <Countdown timeEndStudentMark={timeEndMonitorMark} />
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarLT;
