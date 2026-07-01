import React from "react";

// Dashboard component - shows total income, total expenses, and current balance
// Props:
//   expenses     - array of all expense objects
//   income       - the user's total income (number)
//   onIncomeChange - function to update income in App state
function Dashboard({ expenses, income, onIncomeChange }) {
  // Calculate total expenses by adding up all amounts
  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount);
  }, 0);

  // Balance = income minus total expenses
  const balance = income - totalExpenses;

  // Handler for when user types a new income value
  function handleIncomeInput(event) {
    const value = event.target.value;
    // Only update if value is a valid positive number
    if (value === "" || Number(value) >= 0) {
      onIncomeChange(value === "" ? 0 : Number(value));
    }
  }

  return (
    <div className="dashboard">
      {/* Income Card - user can type their income here */}
      <div className="dashboard-card card-income">
        <p className="card-label">💵 Total Income</p>
        <input
          type="number"
          className="income-input"
          value={income === 0 ? "" : income}
          onChange={handleIncomeInput}
          placeholder="Enter income"
          min="0"
          title="Enter your total income"
        />
      </div>

      {/* Total Expenses Card */}
      <div className="dashboard-card card-expense">
        <p className="card-label">💸 Total Expenses</p>
        <p className="card-amount">₹{totalExpenses.toFixed(2)}</p>
      </div>

      {/* Balance Card */}
      <div className="dashboard-card card-balance">
        <p className="card-label">🏦 Current Balance</p>
        <p
          className="card-amount"
          style={{ color: balance < 0 ? "#dc2626" : "#2563eb" }}
        >
          ₹{balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
