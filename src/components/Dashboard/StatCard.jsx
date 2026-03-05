import React from 'react';

const StatCard = ({ 
  label, 
  value, 
  icon, 
  color = 'primary'
}) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
      <div className="stat-chart">
        <svg width="60" height="30" viewBox="0 0 60 30">
          <path
            d="M5,20 L15,10 L25,25 L35,5 L45,15 L55,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
};

export default StatCard;