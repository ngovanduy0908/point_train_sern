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
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HouseIcon from "@mui/icons-material/House";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import { useEffect, useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";

const navItems = [
  {
    text: "Trang chủ",
    icon: <HouseIcon />,
    path: "overview",
  },
  {
    text: "Quản lý khoa",
    icon: <ApartmentOutlinedIcon />,
    path: "quanlykhoa",
  },
  {
    text: "Quản lý chuyên ngành",
    icon: <BusinessIcon />,
    path: "quanlychuyennganh",
  },
  {
    text: "Quản lý khóa học",
    icon: <SchoolOutlinedIcon />,
    path: "quanlykhoahoc",
  },
  {
    text: "Quản lý học kì",
    icon: <AssignmentOutlinedIcon />,
    path: "quanlyhocki",
  },
  {
    text: "Quản lý thời gian",
    icon: <EventIcon />,
    path: "quanlythoigiancham",
  },
  {
    text: "Sinh hoạt bổ sung",
    icon: <GroupsIcon />,
    path: "sinhhoatbosung",
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  // console.log(pathname);
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

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
              {navItems.map(({ text, icon, path }) => {
                // const lcText = text.toLowerCase();

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
                      {active.includes(path) && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
