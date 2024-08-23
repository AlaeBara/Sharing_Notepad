const express = require("express");
const {
  AddNote,
  GetNotes,
  UpdateNote,
  DeleteNote,
  PinNote
} = require("../Controller/Notee");
const { jwtMiddleware } = require("../Middelwares/Jwt");

const router = express.Router();

// Route for add note
router.post("/addnote", jwtMiddleware, AddNote);
// Route for update note
router.put("/updatenote/:id", jwtMiddleware, UpdateNote);
// Route for delete note
router.delete("/deletenote/:id", jwtMiddleware, DeleteNote);
// Route for get note
router.get("/allnote", jwtMiddleware, GetNotes);
//Route for Pin note
router.put("/pinnote/:id", jwtMiddleware, PinNote);


module.exports = router;
