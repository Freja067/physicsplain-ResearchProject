import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import winston from 'winston';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'collisionLog.log' })
  ]
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Log endpoint
app.post('/log', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON
  //console.log('Received log:', logMessage); // For verification in the console

  // Log the message using Winston
  logger.info(logMessage);

  // Respond to the client
  res.status(200).send('Log received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
