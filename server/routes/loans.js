const express = require('express');
const router = express.Router();

// Load Loan model
const Loan = require('../models/Loan');

// @route   POST /api/loans/request
// @desc    Request a loan
// @access  Private (Borrower)
router.post('/request', async (req, res) => {
  try {
    const { amount, duration } = req.body;

    // Validate input fields

    const newLoan = new Loan({
      amount,
      duration,
      borrower: req.user.id,
      status: 'pending' // Or any initial status
    });

    await newLoan.save();

    res.json({ msg: 'Loan requested successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/loans
// @desc    Get all loans
// @access  Private (Admin)
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find().populate('borrower', ['email']);
    res.json(loans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
