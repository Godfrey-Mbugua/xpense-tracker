import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  text = 'Loading...',
  fullPage = false
}) => {
  
  const renderSpinner = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`loading-spinner ${size} ${color}`}>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        );

      case 'pulse':
        return <div className={`pulse-spinner ${size} ${color}`}></div>;

      case 'dots':
        return (
          <div className="dots-spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );

      default:
        return null;
    }
  };

  const content = (
    <div className={`loading-container ${type}`}>
      {renderSpinner()}
      {text && <p className="loading-text">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="loading-overlay">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;