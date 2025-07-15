// src/logger.js
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export async function log(stack, level, pkg, message) {
    const body = { stack, level, package: pkg, message };

    try {
        const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log("[LOG SUCCESS]", data);
    } catch (err) {
        console.error("[LOG ERROR]", err);
    }
}
