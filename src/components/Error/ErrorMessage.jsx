import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ 
  type = 'general',
  title,
  message,
  onRetry,
  onGoBack
}) => {
  
  const getDefaultTitle = () => {
    switch (type) {
      case 'not-found':
        return '404 - Not Found';
      case 'unauthorized':
        return 'Access Denied';
      case 'server-error':
        return 'Server Error';
      case 'network-error':
        return 'Network Error';
      default:
        return 'Oops! Something went wrong';
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'not-found':
        return 'The resource you are looking for does not exist.';
      case 'unauthorized':
        return 'You do not have permission to access this resource.';
      case 'server-error':
        return 'The server encountered an internal error. Please try again later.';
      case 'network-error':
        return 'Unable to connect to the server. Please check your internet connection.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const errorTitle = title || getDefaultTitle();
  const errorMessage = message || getDefaultMessage();

  return (
    <div className="error-container">
      <div className={`error-card ${type}`} role="alert">
        <div className="error-icon">
          {type === 'not-found' && '🔍'}
          {type === 'unauthorized' && '🔒'}
          {type === 'server-error' && '🖥️'}
          {type === 'network-error' && '🌐'}
          {type === 'general' && '⚠️'}
        </div>
        
        <h2 className="error-title">{errorTitle}</h2>
        
        <div className="error-message">
          {errorMessage}
        </div>

        <div className="error-actions">
          {onRetry && (
            <button onClick={onRetry} className="error-btn primary">
              🔄 Try Again
            </button>
          )}
          
          {onGoBack && (
            <button onClick={onGoBack} className="error-btn secondary">
              ◀ Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;