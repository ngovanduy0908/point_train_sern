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
import PreviewIcon from "@mui/icons-material/Preview";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";

const navItemsLT = [
  {
    text: "Overview",
    icon: <ApartmentOutlinedIcon />,
    path: "home",
  },
  {
    text: "Xét Điểm Rèn Luyện",
    icon: <PlaylistAddCheckIcon />,
    path: "xetdiemrenluyen",
  },
  {
    text: "Chấm Điểm Rèn Luyện",
    icon: <BorderColorIcon />,
    path: "chamdiemrenluyen",
  },
  {
    text: "Xem Điểm Rèn Luyện",
    icon: <PreviewIcon />,
    path: "xemdiemrenluyen",
  },
];

const SidebarLT = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  // console.log(user);
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
              {navItemsLT.map(({ text, icon, path }) => {
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
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarLT;
