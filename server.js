// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors()); // allows requests from your frontend

// API endpoint to fetch top posts from a dynamic subreddit and limit
app.get('/api/reddit', async (req, res) => {
  const { subreddit, limit = 5 } = req.query; // get subreddit and limit from query parameters

  if (!subreddit) {
    return res.status(400).json({ error: 'Subreddit is required' });
  }

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=all`);
    const data = await response.json();
    res.json(data); // send the JSON to the frontend
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Reddit proxy running at http://localhost:${PORT}`);
});
