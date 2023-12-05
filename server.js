const express = require('express');
const bodyParser = require('body-parser');
const Comment = require('./path-to-mongodb-model'); // Adjust path to your Comment model
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/submit-comment', async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.send('Comment added');
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
