const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  // _id
  parentId: mongoose.ObjectId,
  user:  String, // String is shorthand for {type: String}
  content: String,
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  lastComment: {
    user: String,
    content:  String
  }
});

module.exports = mongoose.model('Post', postSchema);

// Continue with creating the model and reading up about it from:
// https://mongoosejs.com/docs/guide.html