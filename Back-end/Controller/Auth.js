const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Sign-Up Controller
const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const user_check = await User.findOne({ email });
    if (user_check) {
      return res.status(400).json({ message: "This Email already has an account" });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "Registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Sign-In Controller
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user_check = await User.findOne({ email });
    if (!user_check) {
      return res.status(400).json({ message: "This Email does not have an account" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user_check.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token (optional)
    const token = jwt.sign({ user_check }, process.env.token_jwt, { expiresIn: '1h' });

    res.status(200).json({ message: "Logged in successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};







module.exports = { SignUp, SignIn };
