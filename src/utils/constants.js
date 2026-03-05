export const CATEGORIES = [
  'Food',
  'Utilities',
  'Entertainment',
  'Transportation',
  'Shopping',
  'Healthcare',
  'Education',
  'Other'
];

export const SORT_OPTIONS = [
  { value: 'date', label: 'Date' },
  { value: 'amount', label: 'Amount' },
  { value: 'title', label: 'Title' }
];

export const INITIAL_FORM_STATE = {
  title: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().split('T')[0]
};