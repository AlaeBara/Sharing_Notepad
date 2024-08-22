const express = require("express");
const { AddNote, GetNotes, UpdateNote } = require("../Controller/Notee");
const { jwtMiddleware } = require("../Middelwares/Jwt");

const router = express.Router();

// Route for add note
router.post("/addnote", jwtMiddleware, AddNote);
// Route for update note
router.post("/updatenote/:id", jwtMiddleware, UpdateNote);

// Route for get note
router.get("/allnote", jwtMiddleware, GetNotes);

module.exports = router;
