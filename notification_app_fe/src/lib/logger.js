const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFzYW50aF9hcmF2YXBhbGxpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMTQyNSwiaWF0IjoxNzc3NzAwNTI1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGUwZDUyMjItNWJkZi00NDQ0LWI0ZGMtMDA4Zjk3ZThhOWU1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhc2FudGggYXJhdmFwYWxsaSIsInN1YiI6ImFlOThkNmM4LTYwNWMtNDJkNC05ZGFmLTgyZDUzZDBlOWUxOCJ9LCJlbWFpbCI6InByYXNhbnRoX2FyYXZhcGFsbGlAc3JtYXAuZWR1LmluIiwibmFtZSI6InByYXNhbnRoIGFyYXZhcGFsbGkiLCJyb2xsTm8iOiJhcDIzMTEwMDEwODk5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYWU5OGQ2YzgtNjA1Yy00MmQ0LTlkYWYtODJkNTNkMGU5ZTE4IiwiY2xpZW50U2VjcmV0IjoienRhR3hkc1BweFR2S3RXYiJ9.dDHwO5EqHKwlru8SgFtTtF9hfYlL6DYF1rmHGq88tu0";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

export async function Log(level, pkg, message) {
  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message,
      }),
    });
    const data = await res.json();
    console.log(`[LOG] ${level.toUpperCase()} | ${pkg} | ${message} => logID: ${data.logID}`);
  } catch (err) {
    console.error("[LOG FAILED]", err);
  }
}