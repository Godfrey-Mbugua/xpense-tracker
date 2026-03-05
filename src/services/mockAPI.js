// Simulated API calls with delay
export const mockAPI = {
  fetchExpenses: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      { id: 1, title: 'Grocery Shopping', amount: 150.50, category: 'Food', date: '2024-01-15' },
      { id: 2, title: 'Electric Bill', amount: 85.20, category: 'Utilities', date: '2024-01-14' },
      { id: 3, title: 'Movie Tickets', amount: 30.00, category: 'Entertainment', date: '2024-01-13' },
      { id: 4, title: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2024-01-12' },
      { id: 5, title: 'Restaurant Dinner', amount: 65.30, category: 'Food', date: '2024-01-11' },
      { id: 6, title: 'Internet Bill', amount: 60.00, category: 'Utilities', date: '2024-01-10' },
      { id: 7, title: 'Uber Ride', amount: 25.50, category: 'Transportation', date: '2024-01-09' },
      { id: 8, title: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-08' }
    ];
  },

  addExpense: async (expense) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...expense, id: Date.now() };
  },

  deleteExpense: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return id;
  },

  updateExpense: async (id, updatedExpense) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...updatedExpense, id };
  }
};