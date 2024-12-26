const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();  // Import the .env file to access sensitive data

const app = express();
const PORT = 5000;

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use the DATABASE_URL from .env
});

// Define a route to get all expenses from the database
app.get('/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses');  // Query the expenses table
    res.json(result.rows);  // Return the result as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving expenses');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
