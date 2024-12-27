import React, { useState } from 'react';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState({
    userId: '',
    category: '',
    description: '',
    amount: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExpense({ ...currentExpense, [name]: value });
  };

  const handleAddExpense = () => {
    if (editingIndex !== null) {
      // Update existing expense
      const updatedExpenses = expenses.map((expense, index) =>
        index === editingIndex ? currentExpense : expense
      );
      setExpenses(updatedExpenses);
      setEditingIndex(null);
    } else {
      // Add new expense
      setExpenses([...expenses, { ...currentExpense }]);
    }
    clearForm();
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index) => {
    setCurrentExpense(expenses[index]);
    setEditingIndex(index);
  };

  const clearForm = () => {
    setCurrentExpense({ userId: '', category: '', description: '', amount: '' });
  };

  return (
    <div>
      <h1>Expenses Dashboard</h1>
      <div>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={currentExpense.userId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={currentExpense.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={currentExpense.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={currentExpense.amount}
          onChange={handleInputChange}
        />
        <button onClick={handleAddExpense}>
          {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.userId}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleEditExpense(index)}>Edit</button>
                <button onClick={() => handleDeleteExpense(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
