const express = require('express');
const router = express.Router();

// Load Payment model
const Payment = require('../models/Payment');

// @route   POST /api/payments
// @desc    Make a payment
// @access  Private (Lender)
router.post('/', async (req, res) => {
  try {
    const { amount, loanId } = req.body;

    // Validate input fields

    const newPayment = new Payment({
      amount,
      loan: loanId,
      lender: req.user.id
    });

    await newPayment.save();

    res.json({ msg: 'Payment successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/payments
// @desc    Get all payments
// @access  Private (Admin)
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('lender', ['email']);
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
