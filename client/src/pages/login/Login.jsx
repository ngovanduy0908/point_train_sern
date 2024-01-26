import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Header from "../../components/header/Header";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Footer from "../../components/footer/Footer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
const pages = ["TRANG WEB ĐÀO TẠO", "TRANG WEB CNTT", "TRANG WEB HUMG"];

function ResponsiveAppBar() {
  // console.log("trang login : ", socket);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ marginTop: "20px" }}>
      <div className="container navbar_header">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HUMG
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </div>
    </AppBar>
  );
}

const Login = ({ socket }) => {
  // console.log("socket ne: ", socket);
  const [inputs, setInputs] = useState({
    tk: "",
    mk: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const value = await login(inputs);
      // console.log("value login: ", value.maSv);
      if (value.maSv) {
        socket.emit("newUser", value);
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response.data);
      // setErr(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <ResponsiveAppBar
        sx={{
          ".css-19fc6iy-MuiPaper-root-MuiAppBar-root": {
            backgroundColor: "#21bbe5",
          },
        }}
      />
      <div className="container">
        <div className="container_login" id="container_login">
          <div class="form-container sign-up-container">
            <form action="#" className="form_login">
              <h1>Quên mật khẩu</h1>

              <span>Nhập email đã đăng ký</span>
              <input type="email" placeholder="Email" />
              <button>Gửi</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form action="#" className="form_login">
              <h1>Đăng nhập</h1>

              <input
                type="text"
                placeholder="Tài khoản"
                name="tk"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                name="mk"
                onChange={handleChange}
              />
              <span className="login_err">{err && err}</span>
              <button onClick={handleLogin}>Đăng nhập</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Xin Chào!</h1>
                <p>Truy Cập Hệ Thống</p>
                <button
                  class="ghost"
                  id="signIn"
                  onClick={() => {
                    const container =
                      document.getElementById("container_login");
                    container.classList.remove("right-panel-active");
                  }}
                >
                  Đăng nhập
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Xin Chào!</h1>
                <p>Nhập email để lấy lại mật khẩu tại</p>
                <button
                  class="ghost"
                  id="signUp"
                  onClick={() => {
                    const container =
                      document.getElementById("container_login");
                    container.classList.add("right-panel-active");
                  }}
                >
                  Quên mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;
