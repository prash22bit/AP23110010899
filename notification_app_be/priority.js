const { Log } = require("../logging_middleware/index.js");

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFzYW50aF9hcmF2YXBhbGxpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMTQyNSwiaWF0IjoxNzc3NzAwNTI1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGUwZDUyMjItNWJkZi00NDQ0LWI0ZGMtMDA4Zjk3ZThhOWU1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhc2FudGggYXJhdmFwYWxsaSIsInN1YiI6ImFlOThkNmM4LTYwNWMtNDJkNC05ZGFmLTgyZDUzZDBlOWUxOCJ9LCJlbWFpbCI6InByYXNhbnRoX2FyYXZhcGFsbGlAc3JtYXAuZWR1LmluIiwibmFtZSI6InByYXNhbnRoIGFyYXZhcGFsbGkiLCJyb2xsTm8iOiJhcDIzMTEwMDEwODk5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYWU5OGQ2YzgtNjA1Yy00MmQ0LTlkYWYtODJkNTNkMGU5ZTE4IiwiY2xpZW50U2VjcmV0IjoienRhR3hkc1BweFR2S3RXYiJ9.dDHwO5EqHKwlru8SgFtTtF9hfYlL6DYF1rmHGq88tu0";

const NOTIF_API = "http://20.207.122.201/evaluation-service/notifications";

// Weight map: higher = more important
const WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

// Compute priority score for each notification
function computeScore(notification) {
  const weight = WEIGHT[notification.Type] || 0;
  const recencyMs = new Date(notification.Timestamp).getTime();
  // Weight dominates, recency breaks ties within same type
  return weight * 1e12 + recencyMs;
}

// Get top N notifications using score-based ranking
function getTopN(notifications, n) {
  return notifications
    .map((notif) => ({ ...notif, score: computeScore(notif) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

async function fetchNotifications() {
  await Log("backend", "info", "service", "Fetching notifications from API");
  const res = await fetch(NOTIF_API, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  if (!res.ok) {
    await Log("backend", "error", "service", `API responded with status: ${res.status}`);
    throw new Error("Failed to fetch notifications");
  }
  const data = await res.json();
  await Log("backend", "info", "service", `Successfully fetched ${data.notifications.length} notifications`);
  return data.notifications;
}

async function main() {
  await Log("backend", "info", "handler", "Stage 1: Priority Inbox started");

  const notifications = await fetchNotifications();
  const top10 = getTopN(notifications, 10);

  await Log("backend", "info", "handler", `Computed top 10 priority notifications out of ${notifications.length}`);

  console.log("\n========== TOP 10 PRIORITY NOTIFICATIONS ==========\n");
  top10.forEach((n, i) => {
    console.log(`${i + 1}. [${n.Type}] ${n.Message}`);
    console.log(`   Timestamp : ${n.Timestamp}`);
    console.log(`   Score     : ${n.score}`);
    console.log(`   ID        : ${n.ID}`);
    console.log("");
  });

  await Log("backend", "info", "handler", "Stage 1: Priority Inbox completed successfully");
}

main().catch(async (err) => {
  await Log("backend", "fatal", "handler", `Unhandled error in main: ${err.message}`);
  console.error(err);
});