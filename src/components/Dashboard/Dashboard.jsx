import React, { useMemo } from 'react';
import StatCard from './StatCard';
import './Dashboard.css';

const Dashboard = ({ expenses = [] }) => {
  
  const statistics = useMemo(() => {
    if (!expenses.length) {
      return {
        total: 0,
        average: 0,
        highest: 0,
        lowest: 0,
        count: 0,
        categoryCount: 0,
        recentTotal: 0
      };
    }

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const average = total / expenses.length;
    const amounts = expenses.map(exp => exp.amount);
    const highest = Math.max(...amounts);
    const lowest = Math.min(...amounts);
    
    const categories = new Set(expenses.map(exp => exp.category));
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentExpenses = expenses.filter(exp => new Date(exp.date) >= oneWeekAgo);
    const recentTotal = recentExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {
      total,
      average,
      highest,
      lowest,
      count: expenses.length,
      categoryCount: categories.size,
      recentTotal
    };
  }, [expenses]);

  const topCategory = useMemo(() => {
    if (!expenses.length) return null;
    
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    return Object.entries(categoryTotals).reduce((max, current) => 
      current[1] > max[1] ? current : max
    , ['None', 0]);
  }, [expenses]);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard
          label="Total Expenses"
          value={`$${statistics.total.toFixed(2)}`}
          icon="💰"
          color="primary"
        />
        
        <StatCard
          label="Average Expense"
          value={`$${statistics.average.toFixed(2)}`}
          icon="📊"
          color="success"
        />
        
        <StatCard
          label="Transactions"
          value={statistics.count}
          icon="📝"
          color="info"
        />
        
        <StatCard
          label="Highest Expense"
          value={`$${statistics.highest.toFixed(2)}`}
          icon="📈"
          color="warning"
        />
      </div>

      {expenses.length > 0 && (
        <div className="dashboard-insights">
          <h3>Quick Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <span className="insight-label">Categories Used</span>
              <span className="insight-value">{statistics.categoryCount}</span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Lowest Expense</span>
              <span className="insight-value">${statistics.lowest.toFixed(2)}</span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Top Category</span>
              <span className="insight-value">{topCategory ? topCategory[0] : 'N/A'}</span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Recent (7d)</span>
              <span className="insight-value">${statistics.recentTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;