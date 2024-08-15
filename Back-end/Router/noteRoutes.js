const express = require('express');
const { AddNote , GetNotes} = require('../Controller/Notee');
const {jwtMiddleware} =require('../Middelwares/Jwt')

const router = express.Router();


// Route for add note
router.post('/addnote', jwtMiddleware , AddNote );

// Route for get note
router.get('/allnote', jwtMiddleware , GetNotes );









module.exports = router;
