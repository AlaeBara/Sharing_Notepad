const Note = require('../Model/Note');


const AddNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Create a new note
    const note = new Note({
      user: req.user.user._id,
      title,
      content,
      tags: tags || []
    });

    // Save the new note to the database
    await note.save();

    res.status(201).json({ message: "Note added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding note. Please try again later." });
  }
};


module.exports={AddNote}
