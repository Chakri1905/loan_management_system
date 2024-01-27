const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://chakricloud765:chakri765@newcluster.q2g6y80.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
const usersRoutes = require('./routes/User');
const loansRoutes = require('./routes/loans');
const paymentsRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');

app.use('/api/users', usersRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
