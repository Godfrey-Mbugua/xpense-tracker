import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from './Header/Header';
import { FiSmile } from 'react-icons/fi';
import Dashboard from './Dashboard/Dashboard';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpenseList from './ExpenseList/ExpenseList';
import LoadingSpinner from './Loading/LoadingSpinner';
import ErrorMessage from './Error/ErrorMessage';
import { INITIAL_FORM_STATE } from '../utils/constants';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const titleInputRef = useRef(null);
  const amountInputRef = useRef(null);

  // Fetch expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses');
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await api.put(`/expenses/${editingId}`, {
          ...formData,
          amount: parseFloat(formData.amount)
        });
      } else {
        await api.post('/expenses', {
          ...formData,
          amount: parseFloat(formData.amount)
        });
      }
      
      await fetchExpenses();
      resetForm();
    } catch (err) {
      alert('Failed to save expense');
    }
  }, [formData, isEditing, editingId]);

  const handleEdit = useCallback((expense) => {
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date.split('T')[0]
    });
    setIsEditing(true);
    setEditingId(expense._id);
    amountInputRef.current?.focus();
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        await fetchExpenses();
      } catch (err) {
        alert('Failed to delete expense');
      }
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
    setEditingId(null);
    titleInputRef.current?.focus();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        onRetry={fetchExpenses}
      />
    );
  }

  return (
    <div className="expense-tracker">
      <div className="user-header">
        <div className="user-info">
          <FiSmile className="welcome-icon" />
          <span className="welcome-text">Welcome, {user?.name}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      
      <Header />
      
      <Dashboard expenses={expenses} />
      
      <div className="main-content">
        <div className="form-container">
          <ExpenseForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
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