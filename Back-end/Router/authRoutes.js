const express = require('express');
const { SignUp ,SignIn, logout } = require('../Controller/Auth');
const {jwtMiddleware} =require('../Middelwares/Jwt')

const router = express.Router();


// Route for user signup
router.post('/signup', SignUp);

// Route for user signIn
router.post('/signIn', SignIn);

//log out
router.get('/logout',jwtMiddleware , logout );

//check if user logged in
router.post('/check_authenticateToken', jwtMiddleware , (req, res) => {
    res.sendStatus(200);
});







module.exports = router;
