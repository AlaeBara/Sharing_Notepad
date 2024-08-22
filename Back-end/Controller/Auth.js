const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // const user = req.user._id

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

    // Generate JWT token
    const token = jwt.sign({ user:user_check }, process.env.token_jwt, { expiresIn: '1h' });

    // Set token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access the cookie from  JavaScript 
      secure: true, // Ensures the cookie is sent over HTTPS
      sameSite: "strict", // Protects against CSRF
    });

    res.status(200).json({ message: "Logged in successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


const logout = (req, res)=>{
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
}








module.exports = { SignUp, SignIn, logout };
