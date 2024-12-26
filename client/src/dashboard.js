import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    category: '',
    description: '',
    amount: '',
  });

  // Fetch expenses from the backend
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/expenses', formData);
      fetchExpenses(); // Refresh the expenses list
      setFormData({ user_id: '', category: '', description: '', amount: '' });
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      fetchExpenses(); // Refresh the expenses list
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div>
      <h1>Expenses Dashboard</h1>

      {/* Form to Add a New Expense */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Display List of Expenses */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.category}</strong>: ${expense.amount}{' '}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
