import React from "react";

// SearchBar component - lets user type to search expenses by title
// Props:
//   searchTerm - current search text (controlled from App state)
//   onSearch   - function to update search term in App
function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-bar">
      {/* Search icon */}
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search expenses by title..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        id="search-input"
      />
    </div>
  );
}

export default SearchBar;
