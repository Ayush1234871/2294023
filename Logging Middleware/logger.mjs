// logger.mjs
import fetch from 'node-fetch';

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZ2Fyd2FsYXl1MjcxMUBnbWFpbC5jb20iLCJleHAiOjE3NTI1NTc0OTksImlhdCI6MTc1MjU1NjU5OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI4NTEzYWVmLTgxMWUtNGE2NS04NmU0LTkxNzY2MDU0YzZiZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImF5dXNoIGFnYXJ3YWwiLCJzdWIiOiJjYTBmMzViNy0wNTBlLTRjZTEtOWUyNS1kMzBlN2NhMDkxOWEifSwiZW1haWwiOiJhZ2Fyd2FsYXl1MjcxMUBnbWFpbC5jb20iLCJuYW1lIjoiYXl1c2ggYWdhcndhbCIsInJvbGxObyI6IjIyOTQwMjMiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiJjYTBmMzViNy0wNTBlLTRjZTEtOWUyNS1kMzBlN2NhMDkxOWEiLCJjbGllbnRTZWNyZXQiOiJ6TlZ1RXZoQ0RyUnpGU1l3In0.ZgAI828QW4P4Us8f8f-bsK1gYyRBA70azb8q983Gebk";

function log(stack, level, pkg, message) {
    const body = { stack, level, package: pkg, message };

    return fetch("http://20.244.56.144/evaluation-service/logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(body),
    })
        .then(res => res.json())
        .then(data => console.log("[LOG SUCCESS]", data))
        .catch(err => console.error("[LOG ERROR]", err));
}

export default log;
