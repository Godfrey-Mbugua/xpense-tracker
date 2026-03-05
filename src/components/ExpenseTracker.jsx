import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Header from './Header/Header';
import Dashboard from './Dashboard/Dashboard';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpenseList from './ExpenseList/ExpenseList';
import LoadingSpinner from './Loading/LoadingSpinner';
import ErrorMessage from './Error/ErrorMessage';
import { useExpenses } from '../hooks/useExpenses';
import { useForm } from '../hooks/useForm';
import { INITIAL_FORM_STATE } from '../utils/constants';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const { expenses, loading, error, addExpense, deleteExpense, updateExpense } = useExpenses();
  const { formData, handleInputChange, resetForm, setForm } = useForm(INITIAL_FORM_STATE);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  const titleInputRef = useRef(null);
  const amountInputRef = useRef(null);

  // Auto-focus on title input when form is empty
  useEffect(() => {
    if (!formData.title && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [formData.title]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: isEditing ? editingId : Date.now()
    };

    let result;
    if (isEditing) {
      result = await updateExpense(editingId, expenseData);
    } else {
      result = await addExpense(expenseData);
    }

    if (result.success) {
      resetForm();
      setIsEditing(false);
      setEditingId(null);
      titleInputRef.current?.focus();
    } else {
      alert('Failed to save expense. Please try again.');
    }
  }, [formData, isEditing, editingId, addExpense, updateExpense, resetForm]);

  const handleEdit = useCallback((expense) => {
    setForm({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setIsEditing(true);
    setEditingId(expense.id);
    amountInputRef.current?.focus();
  }, [setForm]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const result = await deleteExpense(id);
      if (!result.success) {
        alert('Failed to delete expense. Please try again.');
      }
    }
  }, [deleteExpense]);

  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsEditing(false);
    setEditingId(null);
  }, [resetForm]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    return ['All', ...new Set(expenses.map(exp => exp.category))];
  }, [expenses]);

  if (loading) {
    return <LoadingSpinner fullPage text="Loading your expenses..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        type="server-error"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="expense-tracker">
      <Header />
      
      <Dashboard expenses={expenses} />
      
      <div className="main-content">
        <div className="form-container">
          <ExpenseForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            isEditing={isEditing}
            titleInputRef={titleInputRef}
            amountInputRef={amountInputRef}
          />
        </div>
        
        <div className="expenses-container">
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;