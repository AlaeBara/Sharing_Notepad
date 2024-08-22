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
    const notes = await Note.find({ user: req.user.user._id});

    res.status(200).json({ notes, message: "Notes retrieved successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving notes. Please try again later." });
  }
};


function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${month}-${day}-${year} ${hours}:${minutes}`;
}

const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = req.body;

    // Set updatedAt to current date-time
    updatedNote.updatedAt = formatDate(new Date());

    // Perform the update
    const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true });

    if (!note) {
      console.log("Note not found for ID:", id);
      return res.status(404).json({ message: "Note not found" });
    }

    console.log("Note updated successfully:", note);
    res.status(200).json({ message: "Update successful!", note });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: err.message });
  }
};


module.exports = { AddNote, GetNotes, UpdateNote };
