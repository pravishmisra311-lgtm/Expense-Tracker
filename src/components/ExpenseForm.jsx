import React, { useState, useEffect } from "react";

// List of available expense categories
const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Bills",
  "Other",
];

// ExpenseForm component - handles both adding and editing expenses
// Props:
//   onAddExpense    - function to call when adding a new expense
//   onUpdateExpense - function to call when saving an edited expense
//   onCancel        - function to call when user cancels
//   editingExpense  - the expense object to edit (null when adding new)
function ExpenseForm({ onAddExpense, onUpdateExpense, onCancel, editingExpense }) {
  // Form field state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  // When editingExpense changes, populate the form fields with its data
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      // Reset form when not editing
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate(getTodayDate());
    }
  }, [editingExpense]);

  // Helper to get today's date in YYYY-MM-DD format (for default date value)
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // prevent page reload

    // Basic validation
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (!date) {
      alert("Please select a date.");
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category: category,
      date: date,
    };

    if (editingExpense) {
      // Update existing expense (keep same id)
      onUpdateExpense({ ...expenseData, id: editingExpense.id });
    } else {
      // Add new expense
      onAddExpense(expenseData);
    }

    // Reset form fields after submit
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(getTodayDate());
  }

  return (
    <div className="expense-form-card">
      <h2>{editingExpense ? "✏️ Edit Expense" : "➕ Add New Expense"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Title field */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Lunch, Bus ticket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
          </div>

          {/* Amount field */}
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              placeholder="e.g. 250"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
            />
          </div>

          {/* Category dropdown */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date field */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            {editingExpense ? "Save Changes" : "Add Expense"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
