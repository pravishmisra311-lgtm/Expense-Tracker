import React from "react";

// Maps each category to an emoji icon and a CSS class for coloring
const CATEGORY_STYLES = {
  Food:          { icon: "🍔", className: "cat-food" },
  Transport:     { icon: "🚌", className: "cat-transport" },
  Shopping:      { icon: "🛍️", className: "cat-shopping" },
  Entertainment: { icon: "🎬", className: "cat-entertainment" },
  Health:        { icon: "💊", className: "cat-health" },
  Education:     { icon: "📚", className: "cat-education" },
  Bills:         { icon: "📄", className: "cat-bills" },
  Other:         { icon: "📦", className: "cat-other" },
};

// ExpenseCard component - displays one expense item
// Props:
//   expense  - the expense object { id, title, amount, category, date }
//   onDelete - function called with expense.id when delete is clicked
//   onEdit   - function called with the expense object when edit is clicked
function ExpenseCard({ expense, onDelete, onEdit }) {
  // Get the icon and CSS class for this expense's category
  const style = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES["Other"];

  // Format the date for display (e.g. "30 Jun 2024")
  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  }

  return (
    <div className="expense-card">
      {/* Left side: icon + title + category badge + date */}
      <div className="card-left">
        <div className={`category-icon ${style.className}`}>
          {style.icon}
        </div>

        <div className="card-info">
          <p className="card-title">{expense.title}</p>
          <div className="card-meta">
            <span className={`category-badge ${style.className}`}>
              {expense.category}
            </span>
            <span className="card-date">📅 {formatDate(expense.date)}</span>
          </div>
        </div>
      </div>

      {/* Right side: amount + edit/delete buttons */}
      <div className="card-right">
        <p className="card-amount">₹{Number(expense.amount).toFixed(2)}</p>
        <div className="card-actions">
          {/* Edit button */}
          <button
            className="btn btn-warning"
            onClick={() => onEdit(expense)}
            title="Edit this expense"
          >
            ✏️ Edit
          </button>
          {/* Delete button */}
          <button
            className="btn btn-danger"
            onClick={() => {
              // Ask for confirmation before deleting
              if (window.confirm(`Delete "${expense.title}"?`)) {
                onDelete(expense.id);
              }
            }}
            title="Delete this expense"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
