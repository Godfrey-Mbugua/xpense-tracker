import React from 'react';

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  const categoryClass = expense.category.toLowerCase().replace(' ', '-');
  
  return (
    <div className={`expense-card ${categoryClass}`}>
      <div className="expense-info">
        <h3>{expense.title}</h3>
        <div className="expense-meta">
          <span className="category">{expense.category}</span>
          <span className="date">
            {new Date(expense.date).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="expense-amount">
        ${expense.amount.toFixed(2)}
      </div>
      <div className="expense-actions">
        <button
          onClick={() => onEdit(expense)}
          className="btn-edit"
          aria-label="Edit expense"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="btn-delete"
          aria-label="Delete expense"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;