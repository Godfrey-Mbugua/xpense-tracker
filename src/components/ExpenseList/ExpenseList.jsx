import React, { useMemo } from 'react';
import ExpenseCard from './ExpenseCard';
import ExpenseFilters from './ExpenseFilters';
import './ExpenseList.css';

const ExpenseList = ({ 
  expenses,
  onDelete,
  onEdit,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  categories
}) => {
  const processedExpenses = useMemo(() => {
    let filtered = [...expenses];

    if (filterCategory !== 'All') {
      filtered = filtered.filter(exp => exp.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  }, [expenses, filterCategory, searchTerm, sortBy]);

  return (
    <div className="expenses-section">
      <ExpenseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      {processedExpenses.length === 0 ? (
        <div className="no-expenses">
          <div className="empty-icon">📭</div>
          <h3>No expenses found</h3>
          <p>Add your first expense using the form above!</p>
        </div>
      ) : (
        <div className="expenses-list">
          {processedExpenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;