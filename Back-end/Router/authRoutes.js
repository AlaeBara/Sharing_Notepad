const express = require('express');
const { SignUp ,SignIn } = require('../controllers/authController');

const router = express.Router();

// Route for user signup
router.post('/signup', SignUp);


// Route for user signIn
router.post('/signIn', SignIn);

















module.exports = router;
