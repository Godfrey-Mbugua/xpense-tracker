export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const groupExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
};

export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

export const filterExpensesByDateRange = (expenses, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= start && expenseDate <= end;
  });
};