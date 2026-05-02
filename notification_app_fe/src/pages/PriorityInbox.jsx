import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Box,
  TextField,
  CircularProgress,
  Alert,
  Chip
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../lib/api";
import { Log } from "../lib/logger";

const WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function computeScore(n) {
  return WEIGHT[n.Type] * 1e12 + new Date(n.Timestamp).getTime();
}

export default function PriorityInbox() {
  const [all, setAll] = useState([]);
  const [topN, setTopN] = useState(10);
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 useEffect(() => {
  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchNotifications({
        page: 1,
        limit: 10
      });

      console.log(data);

      if (data && data.notifications) {
        setAll(data.notifications);
      } else {
        setAll([]);
      }

    } catch (err) {
      console.error(err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);
  const prioritized = all
    .filter((n) => filterType === "All" || n.Type === filterType)
    .sort((a, b) => computeScore(b) - computeScore(a))
    .slice(0, topN);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
         Priority Inbox
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Ranked by: Placement {">"} Result {">"} Event, then by recency
      </Typography>

      {/* Controls */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center"
        }}
      >
        <TextField
          label="Top N"
          type="number"
          size="small"
          value={topN}
          onChange={(e) =>
            setTopN(Math.max(1, Math.min(20, Number(e.target.value))))
          }
          slotProps={{
            htmlInput: {
              min: 1,
              max: 20
            }
          }}
          sx={{ width: 100 }}
        />

        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel>Filter Type</InputLabel>

          <Select
            value={filterType}
            label="Filter Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        <Chip
          label={`Showing top ${prioritized.length}`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Notifications */}
      {!loading && !error && (
        <Stack spacing={2}>
          {prioritized.length === 0 ? (
            <Alert severity="info">No notifications found.</Alert>
          ) : (
            prioritized.map((n, i) => (
              <NotificationCard
                key={n.ID}
                notification={n}
                isNew={true}
                rank={i + 1}
              />
            ))
          )}
        </Stack>
      )}
    </Container>
  );
}