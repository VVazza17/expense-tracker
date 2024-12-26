import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);  // This will hold the list of expenses

  useEffect(() => {
    axios.get('/expenses')  // This makes a GET request to the backend
      .then((res) => setExpenses(res.data));  // When the data comes back, we update the state
  }, []);  // This makes sure the request is only made once when the component is loaded

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category}: ${expense.amount}  {/* Displaying each expense */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
