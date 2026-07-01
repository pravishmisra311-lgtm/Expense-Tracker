import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import CategorySummary from "./components/CategorySummary";
import "./App.css";

function App() {
  // ─── State ───────────────────────────────────────────────────────────────
  // Expenses list - loaded from localStorage on first render
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // Monthly income - user can set this for balance calculation
  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem("income");
    return saved ? Number(saved) : 0;
  });

  // Search term typed by user
  const [searchTerm, setSearchTerm] = useState("");

  // Currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Expense being edited (null means we are in "add" mode)
  const [editingExpense, setEditingExpense] = useState(null);

  // Toggle to show/hide the form
  const [showForm, setShowForm] = useState(false);

  // ─── LocalStorage Sync ───────────────────────────────────────────────────
  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save income to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  // ─── CRUD Functions ──────────────────────────────────────────────────────

  // Add a new expense
  function handleAddExpense(newExpense) {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(), // unique id using timestamp
    };
    setExpenses([expenseWithId, ...expenses]);
    setShowForm(false);
  }

  // Delete an expense by its id
  function handleDeleteExpense(id) {
    const updatedList = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedList);
  }

  // Set the expense to be edited and open the form
  function handleEditExpense(expense) {
    setEditingExpense(expense);
    setShowForm(true);
    // Scroll to top so user sees the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Save changes to an edited expense
  function handleUpdateExpense(updatedExpense) {
    const updatedList = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedList);
    setEditingExpense(null);
    setShowForm(false);
  }

  // Cancel edit mode and close the form
  function handleCancelEdit() {
    setEditingExpense(null);
    setShowForm(false);
  }

  // ─── Filtering & Searching ───────────────────────────────────────────────

  // Apply search and category filter to the expenses list
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* Dashboard: shows income, expenses, balance */}
        <Dashboard
          expenses={expenses}
          income={income}
          onIncomeChange={setIncome}
        />

        {/* Button to open/close the Add Expense form */}
        <div className="add-btn-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingExpense(null);
            }}
          >
            {showForm && !editingExpense ? "✕ Cancel" : "+ Add Expense"}
          </button>
        </div>

        {/* Expense Form: shown when adding or editing */}
        {showForm && (
          <ExpenseForm
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            onCancel={handleCancelEdit}
            editingExpense={editingExpense}
          />
        )}

        {/* Search and Filter controls */}
        <div className="controls-row">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <FilterBar
            selectedCategory={selectedCategory}
            onFilter={setSelectedCategory}
          />
        </div>

        {/* Main grid: Expense list on left, Category summary on right */}
        <div className="content-grid">
          <div className="expense-section">
            <h2 className="section-title">
              Expenses{" "}
              <span className="count-badge">{filteredExpenses.length}</span>
            </h2>
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
          </div>

          <div className="summary-section">
            <h2 className="section-title">Category Summary</h2>
            <CategorySummary expenses={expenses} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Expense Tracker &copy; 2026 -Developed by Pravish Misra</p>
      </footer>
    </div>
  );
}

export default App;
