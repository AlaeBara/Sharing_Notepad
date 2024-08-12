const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Configure CORS to allow requests from http://localhost:3000-(Front-end)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies to be sent across domains
}));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));



// Use the auth routes
app.use('/api/auth', authRoutes);









// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
