import { Log } from "./logger";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFzYW50aF9hcmF2YXBhbGxpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMTQyNSwiaWF0IjoxNzc3NzAwNTI1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGUwZDUyMjItNWJkZi00NDQ0LWI0ZGMtMDA4Zjk3ZThhOWU1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhc2FudGggYXJhdmFwYWxsaSIsInN1YiI6ImFlOThkNmM4LTYwNWMtNDJkNC05ZGFmLTgyZDUzZDBlOWUxOCJ9LCJlbWFpbCI6InByYXNhbnRoX2FyYXZhcGFsbGlAc3JtYXAuZWR1LmluIiwibmFtZSI6InByYXNhbnRoIGFyYXZhcGFsbGkiLCJyb2xsTm8iOiJhcDIzMTEwMDEwODk5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYWU5OGQ2YzgtNjA1Yy00MmQ0LTlkYWYtODJkNTNkMGU5ZTE4IiwiY2xpZW50U2VjcmV0IjoienRhR3hkc1BweFR2S3RXYiJ9.dDHwO5EqHKwlru8SgFtTtF9hfYlL6DYF1rmHGq88tu0";

const BASE_URL = "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications({ page = 1, limit = 10, notification_type } = {}) {
  await Log("info", "api", `Fetching notifications page=${page} limit=${limit} type=${notification_type || "all"}`);

  const url = new URL(BASE_URL);
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (notification_type && notification_type !== "All") {
    url.searchParams.set("notification_type", notification_type);
  }

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!res.ok) {
      await Log("error", "api", `Failed to fetch notifications: status ${res.status}`);
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    await Log("info", "api", `Fetched ${data.notifications.length} notifications successfully`);
    return data;
  } catch (err) {
    await Log("error", "api", `API call exception: ${err.message}`);
    throw err;
  }
}