import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import './ExpenseForm.css';

const ExpenseForm = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  onCancel,
  isEditing,
  titleInputRef,
  amountInputRef
}) => {
  return (
    <div className="form-section">
      <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={onSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            ref={titleInputRef}
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            placeholder="Enter expense title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($) *</label>
          <input
            ref={amountInputRef}
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={onInputChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onInputChange}
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={onInputChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
          {isEditing && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;