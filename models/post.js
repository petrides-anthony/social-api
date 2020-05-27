const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  parentId: mongoose.ObjectId,
  user:  String, // String is shorthand for {type: String}
  content: String,
  likes:   Number,
  timestamp: { type: Date, default: Date.now },
  lastComment: {
    user: String,
    content:  String
  }
});


// Continue with creating the model and reading up about it from:
// https://mongoosejs.com/docs/guide.html