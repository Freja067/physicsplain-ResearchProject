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
