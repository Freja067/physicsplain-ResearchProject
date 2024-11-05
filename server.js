// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Log endpoint
app.post('/log', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON

  // Process the log message (e.g., save it, forward it, etc.)
  console.log('Received log:', logMessage);

  // Respond to the client
  res.status(200).send('Log received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

