import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useState } from "react";
import SidebarLT from "../SidebarLT";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LayoutAdmin = ({ currentUser, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <SidebarLT
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
          />
          <Outlet />
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default LayoutAdmin;
