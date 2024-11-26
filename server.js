// server.js
import express from 'express';
import pino from 'pino';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'body-parser';
const { json } = pkg;
const app = express();
const PORT = 3000;

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware to parse JSON bodies
app.use(json());

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, 'public')));

const logger = pino({
  level: 'info',
  transport: {
      target: 'pino/file',
      options: { destination: 'logfile.log' } 
  },
});

// Log endpoint
app.post('/log', (req, res) => {
  const logMessage = req.body; // Assuming logs are sent as JSON

  // Process the log message (e.g., save it, forward it, etc.)
  //console.log('Received log:', logMessage);
  logger.info(logMessage);
  // Respond to the client
  res.status(200).send('Log received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

