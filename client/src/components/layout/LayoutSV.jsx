import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import SidebarSV from "../SidebarSV";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutAdmin = ({ currentUser, theme, socket }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  console.log("socket in layout sv: ", socket);

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (socket) {
      // socket.id = currentUser.maSv;
      // console.log("soocket: ", socket);
      socket.on("getNotification", (data) => {
        // console.log("vao day dc ko");
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);
  console.log("notifications: ", notifications);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <SidebarSV
          user={currentUser || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
            user={currentUser || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            notifications={notifications}
            socket={socket}
          />
          <Outlet />
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default LayoutAdmin;
