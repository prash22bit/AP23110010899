const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFzYW50aF9hcmF2YXBhbGxpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNTI4MSwiaWF0IjoxNzc3NzA0MzgxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTU0MWY3YWEtNzZkNy00NWRjLWE2ODctMmU4OGFhYTk1YjU2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhc2FudGggYXJhdmFwYWxsaSIsInN1YiI6ImFlOThkNmM4LTYwNWMtNDJkNC05ZGFmLTgyZDUzZDBlOWUxOCJ9LCJlbWFpbCI6InByYXNhbnRoX2FyYXZhcGFsbGlAc3JtYXAuZWR1LmluIiwibmFtZSI6InByYXNhbnRoIGFyYXZhcGFsbGkiLCJyb2xsTm8iOiJhcDIzMTEwMDEwODk5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYWU5OGQ2YzgtNjA1Yy00MmQ0LTlkYWYtODJkNTNkMGU5ZTE4IiwiY2xpZW50U2VjcmV0IjoienRhR3hkc1BweFR2S3RXYiJ9.xjFqvqrhDvtjKOzbLY_vOTyvU04A3skRc2QGfbgKgXs";

export async function Log(level, pkg, message) {
  try {
    await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {}
}