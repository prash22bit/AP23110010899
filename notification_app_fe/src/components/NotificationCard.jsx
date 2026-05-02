import {
  Card, CardContent, Typography, Chip, Box, Stack
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";

const TYPE_CONFIG = {
  Placement: { color: "primary", icon: <WorkIcon fontSize="small" />, bg: "#e3f2fd" },
  Result: { color: "success", icon: <SchoolIcon fontSize="small" />, bg: "#e8f5e9" },
  Event: { color: "warning", icon: <EventIcon fontSize="small" />, bg: "#fff8e1" },
};

export default function NotificationCard({ notification, isNew, rank }) {
  const config = TYPE_CONFIG[notification.Type] || TYPE_CONFIG.Event;

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeft: "5px solid",
        borderColor: `${config.color}.main`,
        backgroundColor: isNew ? config.bg : "#fafafa",
        opacity: isNew ? 1 : 0.8,
        transition: "all 0.2s ease",
        "&:hover": { boxShadow: 3, transform: "translateY(-1px)" },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            {rank && (
              <Typography
                variant="h6"
                sx={{ color: "text.secondary", minWidth: 32, fontWeight: 700 }}
              >
                #{rank}
              </Typography>
            )}
            <Chip
              icon={config.icon}
              label={notification.Type}
              color={config.color}
              size="small"
            />
            {isNew && (
              <Chip
                label="NEW"
                color="error"
                size="small"
                sx={{ fontWeight: 700, fontSize: "0.65rem" }}
              />
            )}
          </Box>
        </Stack>
        <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, ml: rank ? 4 : 0 }}>
          {notification.Message}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: rank ? 4 : 0 }}>
          🕐 {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}