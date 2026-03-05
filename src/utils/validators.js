export const validateExpense = (expense) => {
  const errors = {};

  if (!expense.title || expense.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (expense.title.length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  } else if (expense.title.length > 50) {
    errors.title = 'Title must not exceed 50 characters';
  }

  if (!expense.amount && expense.amount !== 0) {
    errors.amount = 'Amount is required';
  } else if (isNaN(expense.amount)) {
    errors.amount = 'Amount must be a number';
  } else if (expense.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (expense.amount > 1000000) {
    errors.amount = 'Amount must not exceed 1,000,000';
  }

  const validCategories = ['Food', 'Utilities', 'Entertainment', 'Transportation', 
                          'Shopping', 'Healthcare', 'Education', 'Other'];
  if (!expense.category) {
    errors.category = 'Category is required';
  } else if (!validCategories.includes(expense.category)) {
    errors.category = 'Please select a valid category';
  }

  if (!expense.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(expense.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(selectedDate.getTime())) {
      errors.date = 'Please enter a valid date';
    } else if (selectedDate > today) {
      errors.date = 'Date cannot be in the future';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateField = (name, value) => {
  switch (name) {
    case 'title':
      if (!value || value.trim() === '') return 'Title is required';
      if (value.length < 3) return 'Title must be at least 3 characters';
      if (value.length > 50) return 'Title must not exceed 50 characters';
      return '';

    case 'amount':
      if (!value && value !== 0) return 'Amount is required';
      if (isNaN(value)) return 'Amount must be a number';
      const numValue = parseFloat(value);
      if (numValue <= 0) return 'Amount must be greater than 0';
      if (numValue > 1000000) return 'Amount must not exceed 1,000,000';
      return '';

    default:
      return '';
  }
};