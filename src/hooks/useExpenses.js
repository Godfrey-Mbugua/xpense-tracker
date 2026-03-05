import { useState, useEffect, useCallback } from 'react';
import { mockAPI } from '../services/mockAPI';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await mockAPI.fetchExpenses();
        setExpenses(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = useCallback(async (expense) => {
    try {
      const newExpense = await mockAPI.addExpense(expense);
      setExpenses(prev => [newExpense, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await mockAPI.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const updateExpense = useCallback(async (id, updatedExpense) => {
    try {
      const updated = await mockAPI.updateExpense(id, updatedExpense);
      setExpenses(prev => prev.map(exp => exp.id === id ? updated : exp));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense,
    updateExpense
  };
};