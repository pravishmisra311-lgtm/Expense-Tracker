import React from "react";
import ExpenseCard from "./ExpenseCard";

// ExpenseList component - renders all expense cards or an empty message
// Props:
//   expenses - array of expense objects to display
//   onDelete - function to call when user deletes an expense
//   onEdit   - function to call when user wants to edit an expense
function ExpenseList({ expenses, onDelete, onEdit }) {
  // If no expenses match the current search/filter, show a message
  if (expenses.length === 0) {
    return (
      <div className="empty-message">
        <span>📭</span>
        No expenses found. Try adding one!
      </div>
    );
  }

  return (
    <div className="expense-list">
      {/* Map over expenses and render a card for each one */}
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
