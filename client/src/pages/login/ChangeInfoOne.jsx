import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isValidEmail } from "utils/function/validateValue";
const pages = ["TRANG WEB ĐÀO TẠO", "TRANG WEB CNTT", "TRANG WEB HUMG"];

function ResponsiveAppBar() {
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

const ChangeInfoOne = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    phone_number: "",
  });
  const [err, setErr] = useState(null);
  const [suc, setSuc] = useState(null);
  const handleClick = () => {
    // setShouldNavigate(true);
    navigate("/login");
    // console.log('a');
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = isValidEmail(inputs.email);
      if (!result) {
        return toast.warn("Vui lòng nhập đúng định dạng email");
      }
      if (!inputs.password) {
        return toast.warn("Vui lòng nhập mật khẩu");
      }
      if (inputs.password === "123456") {
        return toast.warn("Vui lòng nhập mật khẩu khác mật khẩu mặc định");
      }

      const res = await axios.put(
        "http://localhost:8800/api/users/update",
        inputs,
        {
          withCredentials: true,
        }
      );
      setSuc(res.data);
      localStorage.removeItem("user");
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      toast.success("Thay đổi thành công. Vui lòng đăng nhập lại");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <ResponsiveAppBar />
      <div className="container">
        <div className="container_login" id="container_login">
          <div class="form-container sign-in-container">
            <form action="#">
              <h1>Thay đổi thông tin</h1>

              <input
                type="email"
                placeholder="Nhập email"
                name="email"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Nhập số điện thoại"
                name="phone_number"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Nhập mật khẩu mới"
                name="password"
                onChange={handleChange}
              />

              <p
                onClick={handleClick}
                className="cursor-pointer font-bold hover:opacity-80"
              >
                {suc && "Vui lòng đăng nhập lại tại đây"}
              </p>
              {/* {shouldNavigate && <Navigate to="/login" />} */}
              <button onClick={handleLogin}>Lưu</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
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
                <h1>Xin Chào Bạn!</h1>
                <p>Trở lại trang đăng nhập.</p>
                <button
                  class="ghost"
                  id="signUp"
                  onClick={() => navigate("/login")}
                >
                  Quay Lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default ChangeInfoOne;
