import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Header() {
  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: "rgb(59 130 246)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <h1 className="text-base md:text-2xl">Modulo de consulta de usuarios</h1>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <AccountCircle />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
