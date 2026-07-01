import React from "react";

// Category icon mapping
const CATEGORY_ICONS = {
  Food:          "🍔",
  Transport:     "🚌",
  Shopping:      "🛍️",
  Entertainment: "🎬",
  Health:        "💊",
  Education:     "📚",
  Bills:         "📄",
  Other:         "📦",
};

// CategorySummary component - shows total spent per category
// Props:
//   expenses - full list of all expenses (not filtered)
function CategorySummary({ expenses }) {
  // If no expenses, show a message
  if (expenses.length === 0) {
    return (
      <div className="category-summary">
        <p className="summary-empty">No expense data yet.</p>
      </div>
    );
  }

  // Group expenses by category and sum up amounts
  // Result: { Food: 500, Transport: 200, ... }
  const categoryTotals = expenses.reduce((acc, expense) => {
    const cat = expense.category;
    if (acc[cat]) {
      acc[cat] += Number(expense.amount);
    } else {
      acc[cat] = Number(expense.amount);
    }
    return acc;
  }, {});

  // Find the maximum total to calculate bar widths
  const maxAmount = Math.max(...Object.values(categoryTotals));

  // Convert object to array and sort by amount (highest first)
  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="category-summary">
      {sortedCategories.map(([category, total]) => {
        // Calculate bar width as a percentage of the highest category
        const barWidth = maxAmount > 0 ? (total / maxAmount) * 100 : 0;
        const icon = CATEGORY_ICONS[category] || "📦";

        return (
          <div key={category} className="summary-item">
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Category name with icon */}
                <span className="summary-cat-name">
                  {icon} {category}
                </span>
                {/* Total amount for this category */}
                <span className="summary-amount">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {/* Progress bar to visually compare categories */}
              <div className="summary-bar-wrap">
                <div
                  className="summary-bar"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategorySummary;
