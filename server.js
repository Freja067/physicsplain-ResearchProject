// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const app = express();
const PORT = 3000;


const logger = bunyan.createLogger({
  name: 'collisionLogger',
  streams: [
    {
      level: 'info',
      path: './logs/collisions.log' // Log to a file
    }
  ]
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Log endpoint
app.post('/log/collision', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON

  // Use Bunyan to log the received message
  logger.info(logMessage, 'collision detected');

  // Respond to the client
  res.status(200).send('Log received');
});

// Log endpoint
app.post('/log/init', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON

  // Use Bunyan to log the received message
  logger.info(logMessage, 'initialized');

  // Respond to the client
  res.status(200).send('Log received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

