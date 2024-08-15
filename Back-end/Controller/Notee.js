const Note = require('../Model/Note');


const AddNote = async (req, res) => {
    try {
      const { title, content, tags } = req.body;
  
      const {user} = req.user; 
  
      // Check title
      if (!title) {
        return res.status(400).json({ error: true, message:"Title is missing" });
      }

      //Check content
      if (!content) {
        return res.status(400).json({ error: true, message:"Content is missing" });
      }

      //Check tags
      if (!tags) {
        return res.status(400).json({ error: true, message:"Tag is missing" });
      }
  
      // Create a new note
      const note = new Note({
        user : user._id,
        title,
        content,
        tags : tags || []
      });
  
      // Save the new user to the database
      await user.save();
  
      res.status(201).json({ message: "Add Note successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: " error add note. Please try again later." });
    }
};



module.exports={AddNote}
