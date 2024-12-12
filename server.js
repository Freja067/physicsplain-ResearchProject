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

// Function to log memory usage
function logMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log('Memory Usage:', {
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`, // Resident Set Size
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`, // Total heap allocated
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`, // Heap actually used
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB` // External memory used
  });

}

// Log memory usage every 5 seconds
setInterval(logMemoryUsage, 5000); // You can adjust the interval as needed

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
