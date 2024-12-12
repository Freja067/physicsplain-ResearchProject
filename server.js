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

function logMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log('Memory Usage:', {
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`, // Resident Set Size
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`, // Total heap allocated
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`, // Heap actually used
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB` // External memory used
  });

}

setInterval(logMemoryUsage, 5000);

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

