const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/gamify', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema for Comments
const CommentSchema = new mongoose.Schema({
    user: String,
    text: String,
    feedback: [{ user: String, text: String }],
}, { timestamps: true });

// Create a model from the schema
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
