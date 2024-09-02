const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Function to handle MySQL connection with retries
function connectWithRetry() {
  const db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log('Connected to the MySQL database.');
      startServer(db); // Start the server only if the connection is successful
    }
  });
}

// Function to start the Express server
function startServer(db) {
  // Endpoint to check API status
  app.get('/api/status', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Endpoint to fetch users
  app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
        return;
      }
      res.json(results);
    });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const path = require('path');

// Serve the HTML file for the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the connection process
connectWithRetry();
