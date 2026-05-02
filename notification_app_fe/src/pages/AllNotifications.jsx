import { useEffect, useState } from "react";
import {
  Container, Typography, Select, MenuItem,
  FormControl, InputLabel, Stack, Box,
  Pagination, CircularProgress, Alert
} from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../lib/api";
import { Log } from "../lib/logger";

const VIEWED_KEY = "viewed_notifications";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewed, setViewed] = useState(() => {
    const stored = localStorage.getItem(VIEWED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      await Log("info", "page", `AllNotifications loaded - page=${page} type=${type}`);
      try {
        const data = await fetchNotifications({
          page,
          limit: 10,
          notification_type: type === "All" ? undefined : type,
        });

        const notifs = data.notifications || [];
        setNotifications(notifs);

        // estimate total pages
        if (notifs.length < 10) {
          setTotalPages(page);
        } else {
          setTotalPages(page + 1);
        }

        // mark as viewed
        setViewed((prev) => {
          const updated = new Set([...prev, ...notifs.map((n) => n.ID)]);
          localStorage.setItem(VIEWED_KEY, JSON.stringify([...updated]));
          return updated;
        });
      } catch (err) {
        setError("Failed to load notifications. Please try again.");
        await Log("error", "page", `AllNotifications fetch error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, type]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        📬 All Notifications
      </Typography>

      {/* Filter */}
      <Stack direction="row" spacing={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => { setType(e.target.value); setPage(1); }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Notifications List */}
      {!loading && !error && (
        <Stack spacing={2}>
          {notifications.length === 0 ? (
            <Alert severity="info">No notifications found.</Alert>
          ) : (
            notifications.map((n) => (
              <NotificationCard
                key={n.ID}
                notification={n}
                isNew={!viewed.has(n.ID)}
              />
            ))
          )}
        </Stack>
      )}

      {/* Pagination */}
      {!loading && notifications.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}