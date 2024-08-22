const Note = require("../Model/Note");

const AddNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    // Create a new note
    const note = new Note({
      user: req.user.user._id,
      title,
      content,
      tags: tags || [],
    });

    // Save the new note to the database
    await note.save();

    res.status(201).json({ message: "Note added successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding note. Please try again later." });
  }
};

const GetNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({ notes, message: "Notes retrieved successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving notes. Please try again later." });
  }
};
const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const note = await Note.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json({ message: "update succussefly!!", note });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { AddNote, GetNotes, UpdateNote };
