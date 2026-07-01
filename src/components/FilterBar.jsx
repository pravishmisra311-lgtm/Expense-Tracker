import React from "react";

// All category options including "All" to show everything
const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Bills",
  "Other",
];

// FilterBar component - lets user filter expenses by category
// Props:
//   selectedCategory - currently selected category (controlled from App)
//   onFilter         - function to update selected category in App
function FilterBar({ selectedCategory, onFilter }) {
  return (
    <div className="filter-bar">
      <select
        value={selectedCategory}
        onChange={(e) => onFilter(e.target.value)}
        id="category-filter"
        title="Filter by category"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "All" ? "📂 All Categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
