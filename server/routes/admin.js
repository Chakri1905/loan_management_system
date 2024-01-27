const express = require('express');
const router = express.Router();

// Load User, Loan, Payment models
const User = require('../models/User');
const Loan = require('../models/Loan');
const Payment = require('../models/Payment');

// @route   GET /api/admin/transactions
// @desc    Get all transactions (loans, payments)
// @access  Private (Admin)
router.get('/transactions', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const loans = await Loan.find();
    const payments = await Payment.find();
    
    res.json({ users, loans, payments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
