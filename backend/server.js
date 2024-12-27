// Import required modules
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Routes

// GET: Fetch all expenses
app.get('/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// POST: Add a new expense
app.post('/expenses', async (req, res) => {
  const { user_id, category, description, amount, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (user_id, category, description, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, category, description, amount, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// PUT: Update an existing expense
app.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { category, description, amount, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE expenses SET category = $1, description = $2, amount = $3, date = $4 WHERE id = $5 RETURNING *',
      [category, description, amount, date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// DELETE: Remove an expense
app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM expenses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully', deletedExpense: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});