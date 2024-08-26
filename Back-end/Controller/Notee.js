const Note = require("../Model/Note");
const SharedNote = require('../Model/SharedNote')
const User = require('../Model/User')


//for create New Note:
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
    const personalNotes = await Note.find({ user: req.user.user._id })
      .sort({ pinned: -1, updatedAt: -1 })
      .lean(); // Convert to plain JavaScript object

    const sharedNotes = await SharedNote.find({ sharedWithUsers: req.user.user.email })
      .populate('noteId')
      .sort({ sharedAt: -1 });

    const combinedNotes = [
      ...personalNotes.map(note => ({
        ...note,
        isPersonal: true,  // Indicate this is a personal note
        isShared: false
      })),
      ...sharedNotes.map(shared => ({
        ...shared.noteId.toObject(),
        isPersonal: false,
        isShared: true,
        sharedBy: shared.sharedByUser
      }))
    ].sort((a, b) => {
      if (a.pinned === b.pinned) {
        return b.updatedAt - a.updatedAt;
      }
      return b.pinned ? 1 : -1;
    });

    res.status(200).json({ notes: combinedNotes, message: "Notes retrieved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving notes. Please try again later." });
  }
};





//for Update a note:
function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
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



//for Delete a note:
const DeleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting note. Please try again later." });
  }
};


//for Pin a Note:

const PinNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the note by ID
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Toggle the pinned status
    note.pinned = !note.pinned;
    note.updatedAt = formatDate(new Date());

    // Save the changes
    await note.save();

    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



//for Share a Note:

const ShareNote = async (req, res) => {
  try {
    const noteId = req.params.id; 
    const { shareEmail } = req.body;
    console.log('Received shareEmail:', shareEmail);
    const sharedByUser = req.user.user._id;

  
    const trimmedEmail = shareEmail.trim();

    // Find existing shared note or create a new one
    let sharedNote = await SharedNote.findOne({ noteId });

    if (sharedNote) {
      // If the note is already shared, add the new email if it doesn't exist
      if (!sharedNote.sharedWithUsers.includes(shareEmail)) {
        sharedNote.sharedWithUsers.push(shareEmail);
      } else {
        return res.status(400).json({ message: "This note is already shared with this email." });
      }
    } else {
      // If the note isn't shared yet, create a new SharedNote document
      sharedNote = new SharedNote({
        noteId,
        sharedWithUsers: [shareEmail],
        sharedByUser,
        sharedAt: formatDate(new Date()),
      });
    }

    // Save the shared note document
    await sharedNote.save();

    // Send success response
    res.status(200).json({ message: "Note shared successfully!", sharedNote });
  } catch (error) {
    console.error("Error sharing note:", error);
    res.status(500).json({ message: "An error occurred while sharing the note." });
  }
};





module.exports = { AddNote, GetNotes, UpdateNote, DeleteNote, PinNote,ShareNote  };