// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pino = require('pino');
const app = express();
const PORT = 3000;

const logger = pino({
  level: 'info',
  transport: {
      target: 'pino/file',
      options: { destination: './logs/collisions.log' } 
  },
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Log endpoint
app.post('/log/collision', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON

  // Use Bunyan to log the received message
  logger.info(logMessage);

  // Respond to the client
  res.status(200).send('Log received');
});

// Log endpoint
app.post('/log/init', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON

  // Use Bunyan to log the received message
  logger.info(logMessage);

  // Respond to the client
  res.status(200).send('Log received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
