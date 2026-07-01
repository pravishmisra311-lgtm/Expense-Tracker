# 💰 Expense Tracker — React.js Project


---

##Live Demo

https://expense-tracker-khaki-nu.vercel.app/

## 🚀 Features

| Feature | Description |
|---|---|
| ➕ Add Expense | Add expenses with title, amount, category, and date |
| ✏️ Edit Expense | Update any existing expense |
| 🗑️ Delete Expense | Remove any expense with a confirmation prompt |
| 📊 Dashboard | See total income, total expenses, and current balance |
| 📂 Category Summary | View total spending per category with progress bars |
| 🔍 Search | Search expenses by title |
| 🔽 Filter | Filter expenses by category |
| 💾 Local Storage | All data is saved in the browser — persists on refresh |
| 📱 Responsive | Works on mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

- **React.js** (Create React App)
- **HTML5**
- **CSS3** (Flexbox, CSS Grid, Responsive Design)
- **JavaScript ES6+**
- **Browser Local Storage**

---

## 📁 Folder Structure

```
expense-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx          → App title/header
│   │   ├── Dashboard.jsx       → Income / Expenses / Balance cards
│   │   ├── ExpenseForm.jsx     → Add & Edit expense form
│   │   ├── ExpenseList.jsx     → Renders list of ExpenseCards
│   │   ├── ExpenseCard.jsx     → Single expense card with Edit/Delete
│   │   ├── SearchBar.jsx       → Search input
│   │   ├── FilterBar.jsx       → Category filter dropdown
│   │   └── CategorySummary.jsx → Spending breakdown by category
│   ├── App.js                  → Root component (state management)
│   ├── App.css                 → All styles
│   └── index.js                → Entry point
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### Step 1 — Clone or download the project

```bash
# If downloaded as ZIP, extract it
# Then open a terminal in the project folder
cd expense-tracker
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Start the development server

```bash
npm start
```

The app will open automatically at **http://localhost:3000**

---

## 🧠 React Concepts Used

| Concept | Where Used |
|---|---|
| `useState` | Managing expenses, form fields, search, filter |
| `useEffect` | Syncing data with localStorage |
| **Props** | Passing data and handlers between components |
| **Event Handling** | Form submit, button clicks, input changes |
| **Conditional Rendering** | Show/hide form, empty messages |
| `Array.map()` | Rendering expense cards and category lists |
| `Array.filter()` | Search and category filtering |
| `Array.reduce()` | Calculating totals and category sums |
| **Controlled Components** | All form inputs controlled via state |
| **Component Reusability** | ExpenseCard reused in ExpenseList |

---

## 📝 Interview Talking Points

### How is data persisted?
> Local Storage is used via `localStorage.setItem()` inside a `useEffect` hook that runs every time the `expenses` state changes. On app load, the initial state reads from `localStorage.getItem()`.

### How does CRUD work?
> - **Create**: `handleAddExpense` creates a new object with `Date.now()` as ID and spreads it into the expenses array.
> - **Read**: The `expenses` state array is passed as props to child components.
> - **Update**: `handleUpdateExpense` maps over the array and replaces the matching expense by ID.
> - **Delete**: `handleDeleteExpense` filters out the expense with the matching ID.

### How does search + filter work?
> Both `searchTerm` and `selectedCategory` are state variables. The `filteredExpenses` variable is computed by chaining `.filter()` on the expenses array before passing it to `ExpenseList`.

### What is prop drilling?
> State lives in `App.js` and is passed down to child components via props. Handler functions (`onDelete`, `onEdit`) are also passed as props so child components can communicate back up.

---

## 📱 Responsive Design

- **Desktop**: 3-column dashboard, 2-column content grid
- **Tablet**: 1-column content grid, 3-column dashboard
- **Mobile**: Single column layout, stacked cards

---

## 🎨 Color Palette

| Color | Hex | Usage |
|---|---|---|
| Primary Blue | `#2563eb` | Header, buttons, badges |
| Success Green | `#16a34a` | Income amount |
| Danger Red | `#dc2626` | Expense amounts, delete button |
| Warning Orange | `#d97706` | Edit button |
| Light Gray | `#f3f4f6` | Page background |
| White | `#ffffff` | Cards |

---
