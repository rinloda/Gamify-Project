const express = require('express');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const path = require('path'); // Import the path module
const window = (new JSDOM('')).window;
const purify = DOMPurify(window);
const app = express();
const PORT = 3000;
const logger = require('./logger');
const Joi = require('joi'); // Joi is a popular validation library
const { anonymizeUserData } = require('./utils');
const UserConsent = require('./utils');

let comments = []; // In-memory store for comments

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route to serve the main HTML file (if it's not named index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.html')); // Replace with your HTML file's name
});

app.get('/get-comments', (req, res) => {
    res.json(comments);
});

app.post('/post-comment', (req, res) => {
    const comment = req.body;
    comment.text = purify.sanitize(comment.text); // Sanitize the comment text
    comments.push(comment);
    res.status(200).send('Comment added');
});

app.get('/generate-error', (req, res) => {
    try {
        // Deliberately cause an error
        throw new Error("This is a test error for logging purposes");
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).send('An error occurred');
    }
});
// Schema for credit transaction validation
const creditTransactionSchema = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().min(1).required(),
    // Add more fields as necessary
});

app.post('/api/credit-transaction', (req, res) => {
    // Validate request body
    const { error } = creditTransactionSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Handle the credit transaction...
    // Ensure secure deserialization here if dealing with serialized data

    res.send('Credit transaction processed');
});

app.post('/some-endpoint', (req, res) => {
    const userData = req.body;
    const anonymizedData = anonymizeUserData(userData);
    // Process or store the anonymized data
    res.json(anonymizedData);
});

app.post('/update-consent', async (req, res) => {
    const { userId, consent } = req.body;

    try {
        // Find the user's consent settings and update them
        const updatedConsent = await UserConsent.findOneAndUpdate(
            { userId: userId },
            consent,
            { new: true, upsert: true } // Create a new entry if one doesn't exist
        );

        res.json({ message: 'Consent updated successfully', updatedConsent });
    } catch (error) {
        res.status(500).send('Error updating consent: ' + error.message);
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
