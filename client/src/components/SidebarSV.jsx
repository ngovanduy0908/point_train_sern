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

import BorderColorIcon from "@mui/icons-material/BorderColor";
import PreviewIcon from "@mui/icons-material/Preview";

import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import CountDown from "./countdown/CountDown";
import { getDeadlineBySinhVien } from "utils/getDetails/getDealineBySinhVien";
import { AuthContext } from "context/authContext";
import { formatDay } from "utils/formatDay";
const navItemsSV = [
  {
    text: "Overview",
    icon: <ApartmentOutlinedIcon />,
    path: "home",
  },
  {
    text: "Xem Điểm Rèn Luyện",
    icon: <PreviewIcon />,
    path: "xemdiemrenluyen",
  },
];

const SidebarSV = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const [navList, setNavList] = useState(navItemsSV);
  const [timeStartStudentMark, setTimeStartStudentMark] = useState(null);
  const [timeEndStudentMark, setTimeEndStudentMark] = useState(null);
  const [timeEndMonitorMark, setTimeEndMonitorMark] = useState(null);
  const [checkTimePoint, setCheckTimePoint] = useState(false);
  const curDate = new Date();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const getDeadlineByMaLop = async () => {
    try {
      const res = await getDeadlineBySinhVien(`${currentUser.maLop}`);
      setTimeStartStudentMark(res.start_time_student);
      setTimeEndStudentMark(res.end_time_student);
      setTimeEndMonitorMark(res.end_time_monitor);
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
    // console.log("a va b: ", a, b);
    if (a && b) {
      setCheckTimePoint(true);
      const isChamDiemRenLuyenExists = navItemsSV.some(
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
                          color: active.includes(path)
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
                <CountDown
                  timeStartStudentMark={timeStartStudentMark}
                  timeEndStudentMark={timeEndStudentMark}
                  timeEndMonitorMark={timeEndMonitorMark}
                  currentDate={curDate}
                />
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarSV;
