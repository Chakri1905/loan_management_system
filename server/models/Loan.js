const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Loan', LoanSchema);
