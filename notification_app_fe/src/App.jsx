import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";
import { Box } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}