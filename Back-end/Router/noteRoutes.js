const express = require('express');
const { AddNote } = require('../Controller/Notee');
const {jwtMiddleware} =require('../Middelwares/Jwt')

const router = express.Router();


// Route for add note
router.post('/addnote', jwtMiddleware , AddNote );









module.exports = router;
