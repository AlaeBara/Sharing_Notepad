const mongoose = require('mongoose');

const sharedNoteSchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },

  sharedWithUsers: [{
    type: String, 
    required: true,
  }],

  sharedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  sharedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SharedNote', sharedNoteSchema);