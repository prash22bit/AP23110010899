const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFzYW50aF9hcmF2YXBhbGxpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNTI4MSwiaWF0IjoxNzc3NzA0MzgxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTU0MWY3YWEtNzZkNy00NWRjLWE2ODctMmU4OGFhYTk1YjU2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhc2FudGggYXJhdmFwYWxsaSIsInN1YiI6ImFlOThkNmM4LTYwNWMtNDJkNC05ZGFmLTgyZDUzZDBlOWUxOCJ9LCJlbWFpbCI6InByYXNhbnRoX2FyYXZhcGFsbGlAc3JtYXAuZWR1LmluIiwibmFtZSI6InByYXNhbnRoIGFyYXZhcGFsbGkiLCJyb2xsTm8iOiJhcDIzMTEwMDEwODk5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYWU5OGQ2YzgtNjA1Yy00MmQ0LTlkYWYtODJkNTNkMGU5ZTE4IiwiY2xpZW50U2VjcmV0IjoienRhR3hkc1BweFR2S3RXYiJ9.xjFqvqrhDvtjKOzbLY_vOTyvU04A3skRc2QGfbgKgXs";

export async function fetchNotifications(params = {}) {
  const url = new URL("/api/notifications", window.location.origin);

  if (params.page) url.searchParams.set("page", params.page);
  if (params.limit) url.searchParams.set("limit", params.limit);
  if (params.notification_type)
    url.searchParams.set("notification_type", params.notification_type);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  });

  return await res.json();
}