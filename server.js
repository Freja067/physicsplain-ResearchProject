// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
const start = Date.now();

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const end = Date.now();


console.log(`Execution time: ${end - start} ms`);

