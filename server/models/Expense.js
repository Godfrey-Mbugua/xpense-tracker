import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot exceed 50 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [0.01, 'Amount must be greater than 0'],
    max: [1000000, 'Amount cannot exceed 1,000,000']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Shopping', 'Healthcare', 'Education', 'Other']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;