import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a237e" }}>
      <Toolbar>
        <NotificationsIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Campus Notifications
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<NotificationsIcon />}
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: location.pathname === "/" ? "rgba(255,255,255,0.2)" : "transparent",
              borderRadius: 2,
            }}
          >
            All
          </Button>
          <Button
            color="inherit"
            startIcon={<StarIcon />}
            onClick={() => navigate("/priority")}
            sx={{
              backgroundColor: location.pathname === "/priority" ? "rgba(255,255,255,0.2)" : "transparent",
              borderRadius: 2,
            }}
          >
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}