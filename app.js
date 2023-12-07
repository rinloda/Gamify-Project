const express = require('express');
const app = express();
const PORT = 3000;

// Store chat messages in memory (for demonstration purposes)
let chatMessages = [];

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to get the last 10-12 chat messages
app.get('/get-messages', (req, res) => {
    const lastMessages = chatMessages.slice(-12); // Get the last 12 messages
    res.json(lastMessages);
});

// Endpoint to post a new message
app.post('/post-message', (req, res) => {
    if (chatMessages.length > 100) { // Limit total messages to avoid memory issues
        chatMessages.shift(); // Remove the oldest message
    }
    chatMessages.push(req.body); // Add the new message
    res.status(200).send('Message added');
});

// Store comments in memory (for demonstration purposes)
let comments = [];

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to get comments
app.get('/get-comments', (req, res) => {
    res.json(comments);
});

// Endpoint to post a new comment
app.post('/post-comment', (req, res) => {
    if (comments.length > 50) { // Limit total comments to avoid memory issues
        comments.shift(); // Remove the oldest comment
    }
    comments.push(req.body); // Add the new comment
    res.status(200).send('Comment added');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
