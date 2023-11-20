const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const LANGUAGE_MODEL_API_KEY = process.env.LANGUAGE_MODEL_API_KEY;
const LANGUAGE_MODEL_URL = process.env.LANGUAGE_MODEL_URL;

app.get("/prompt/:text",async (req, res) => {
    const text = req.query.text;

    const payload = {
        prompt: {
            messages: [
                {
                    content: text,
                },
            ],
        },
        temperature: 0.1,
        candidate_count: 1,
    };
    const response = await fetch(LANGUAGE_MODEL_URL, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        method: "POST",
    })

    const data = await response.json();
    console.log(data);
    res.send(data);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
