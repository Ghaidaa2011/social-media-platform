import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { showToast } from "../../../store/toast/toastsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthLogout } from "../../../store/auth/authSlice";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import LoginButton from "../LoginModal/LoginButton";
import RegisterButton from "../RegisterModal/RegisterButton";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector(
    (state) => state.authentication
  );
  const handleLogout = () => {
    dispatch(actAuthLogout()).then(() =>
      dispatch(
        showToast({ message: "Logged Out Successfully!", severity: "success" })
      )
    );
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        marginBottom: { xs: "1vh", sm: "2vh", md: "3vh", lg: "4vh" },
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        backgroundColor: "rgba(255,255,255,0.9)",
        color: "black",
        boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.9)",
        "& .MuiToolbar-regular": { height: "56px" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              cursor: "default",
            }}
          >
            PROJY
          </Typography>
          {/* ===for small screens=== */}
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* ===for small screens===  */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            PROJY
          </Typography>
          {/* //links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
                handleCloseNavMenu();
              }}
              sx={{ my: 1, color: "black", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                navigate("/");
                handleCloseNavMenu();
              }}
              sx={{ my: 1, color: "black", display: "block" }}
            >
              Profile
            </Button>
          </Box>
          {/* ===links=== */}

          {/* Avatar , login and logout */}
          {token ? (
            <>
              <Box sx={{ flexGrow: 0, color: "black" }}>
                <Tooltip title="Open settings">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                    onClick={handleOpenUserMenu}
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.name}
                        src={user?.profile_image || undefined}
                      />
                    </IconButton>
                    <Typography
                      style={{ fontWeight: "500", fontSize: "0.9rem" }}
                    >
                      {user ? user.name : "guest"}
                    </Typography>
                  </Box>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ marginInlineStart: "20px" }}
                onClick={handleLogout}
                disabled={loading == "pending"}
              >
                {loading == "pending" ? (
                  <CircularProgress color="error" size={24} />
                ) : (
                  "Logout"
                )}
              </Button>
            </>
          ) : (
            <>
              <LoginButton />
              <RegisterButton />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
