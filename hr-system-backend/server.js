const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors({
  origin: '*', // ya da 'https://hr-system-tan.vercel.app'
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes); // public
app.use('/api/employees', authMiddleware, employeeRoutes); // protected

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
