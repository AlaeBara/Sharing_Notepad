const mongoose = require('mongoose');

// Helper function to format the date
function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${month}-${day}-${year} ${hours}:${minutes}`;
}

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  tags: [{
    type: String,
    trim: true,
  }],

  pinned: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: String, // Change to String
    default: function() {
      return formatDate(new Date());
    },
  },

  updatedAt: {
    type: String, // Change to String
    default: function() {
      return formatDate(new Date());
    },
  },
});

module.exports = mongoose.model('Note', noteSchema);
