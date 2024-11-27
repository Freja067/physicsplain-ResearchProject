const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const winston = require('winston');

const app = express();
const PORT = 3000;

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './logs/collisionLog.log' })
  ]
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Timing start
const start = Date.now();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  const end = Date.now();
  const executionTime = end - start;
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Execution time: ${executionTime} ms`);
});

// Collision log endpoint
app.post('/log/collision', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON
  logger.info(logMessage, 'Collision detected');
  res.status(200).send('Log received');
});

// Initialization log endpoint
app.post('/log/init', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON
  logger.info(logMessage, 'Initialized');
  res.status(200).send('Log received');
});
