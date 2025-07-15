import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
} from "@mui/material";
import { log } from "../utils/logger";

const URLShortenerPage = () => {
    const [urlInputs, setUrlInputs] = useState([
        { longUrl: "", validity: "", shortcode: "" },
    ]);
    const [results, setResults] = useState([]);

    const handleChange = (index, field, value) => {
        const newInputs = [...urlInputs];
        newInputs[index][field] = value;
        setUrlInputs(newInputs);
    };

    const addInput = () => {
        if (urlInputs.length < 5) {
            setUrlInputs([...urlInputs, { longUrl: "", validity: "", shortcode: "" }]);
        }
    };

    const handleSubmit = async () => {
        const newResults = [];

        for (let input of urlInputs) {
            const { longUrl, validity, shortcode } = input;

            // Basic validations
            if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
                alert("Invalid URL format");
                log("frontend", "error", "component", "Invalid URL format");
                continue;
            }

            const payload = {
                url: longUrl,
                validity: validity ? parseInt(validity) : 30,
                shortcode: shortcode || undefined,
            };

            try {
                const res = await fetch("http://20.244.56.144/url", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                newResults.push({
                    shortUrl: data.shortUrl,
                    expiry: data.expiry,
                    longUrl: longUrl,
                });

                log("frontend", "info", "api", `Shortened URL created for ${longUrl}`);
            } catch (err) {
                log("frontend", "error", "api", `API error: ${err.message}`);
                alert("Error creating shortened URL");
            }
        }

        setResults(newResults);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                URL Shortener
            </Typography>

            {urlInputs.map((input, index) => (
                <Paper key={index} style={{ padding: 16, marginBottom: 12 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Long URL"
                                fullWidth
                                value={input.longUrl}
                                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Validity (mins)"
                                type="number"
                                fullWidth
                                value={input.validity}
                                onChange={(e) => handleChange(index, "validity", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Custom Shortcode"
                                fullWidth
                                value={input.shortcode}
                                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Button onClick={addInput} disabled={urlInputs.length >= 5}>
                + Add URL
            </Button>

            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ ml: 2 }}>
                Shorten URLs
            </Button>

            <Typography variant="h6" sx={{ mt: 4 }}>
                Results
            </Typography>
            {results.map((r, i) => (
                <Paper key={i} style={{ padding: 10, marginBottom: 8 }}>
                    <p><b>Original:</b> {r.longUrl}</p>
                    <p><b>Short:</b> <a href={r.shortUrl}>{r.shortUrl}</a></p>
                    <p><b>Expires at:</b> {r.expiry}</p>
                </Paper>
            ))}
        </Container>
    );
};

export default URLShortenerPage;