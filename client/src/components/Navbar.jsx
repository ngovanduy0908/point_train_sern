import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDayNotification } from "utils/formatDay";
const Navbar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  notifications,
  socket,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElV1, setAnchorElV1] = useState(null);
  // console.log("theme navbar: ", theme);
  const isOpen = Boolean(anchorEl);
  const isOpenNoti = Boolean(anchorElV1);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClickV1 = (event) => setAnchorElV1(event.currentTarget);

  const handleClose = async () => {
    setAnchorEl(null);
  };
  const handleCloseV1 = async () => {
    setAnchorElV1(null);
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout");
    localStorage.removeItem("user");
    if (socket) {
      socket.emit("logoutUser", user?.maSv);
      // console.log("remove nguoi dung");
    }
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        background: `${theme.palette.background.default}`,
        boxShadow: "none",
        top: 0,
        width: `${isSidebarOpen ? "calc(100% - 250px)" : "100%"}`,
        zIndex: "5",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>

          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="1rem"
          >
            <IconButton>
              <LanguageIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HUMG
            </Typography>
          </FlexBetween>
        </FlexBetween>
        {/* right side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            {notifications?.length ? (
              <Tooltip title="Notifications">
                <IconButton onClick={handleClickV1}>
                  <Badge badgeContent={`${notifications?.length}`}>
                    <SvgIcon fontSize="large">
                      <NotificationsNoneIcon />
                    </SvgIcon>
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            <Menu
              anchorEl={anchorElV1}
              open={isOpenNoti}
              onClose={handleCloseV1}
              placement="bottom-start"
              // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {notifications?.length ? (
                notifications.map((item, idx) => (
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      backgroundColor: `${theme.palette.secondary[300]}`,
                      color: `${theme.palette.primary[600]}`,
                      marginTop: "5px",
                    }}
                  >
                    <h4>Lớp trưởng đã duyệt điểm rèn luyện cho bạn </h4>
                    <span>{formatDayNotification(item.currentTime)}</span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No Notification</MenuItem>
              )}
            </Menu>
          </FlexBetween>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYmkp9a2rrD1Sskb9HLt5mDaTt4QaIs8CcBg&usqp=CAU"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />

              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name ? user.name : "Admin"}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.role_name ? user.role_name : "Admin HUMG"}
                </Typography>
              </Box>

              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {user.role_id === 1 ? (
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              ) : (
                <Box>
                  <MenuItem onClick={handleLogout}>Thay đổi thông tin</MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Box>
              )}
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
