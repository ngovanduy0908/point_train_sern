import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

const LayoutAdmin = ({ currentUser, theme }) => {
  //   const mode = useSelector((state) => state.global.mode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  //   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
        <Sidebar
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
    </ThemeProvider>
  );
};

export default LayoutAdmin;
