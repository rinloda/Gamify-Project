// utils.js
function generateUniqueId() {
    // Implementation to generate a unique ID
    // This could be a random string, a UUID, etc.
    return 'unique-id-' + Math.random().toString(36).substr(2, 9);
}

function anonymizeUserData(userData) {
    return {
        ...userData,
        userId: generateUniqueId(),
        email: null,
        name: null,
        // Additional anonymization as required
    };
}

module.exports = { anonymizeUserData };

const mongoose = require('mongoose');

const UserConsentSchema = new mongoose.Schema({
    userId: String,
    emailMarketing: Boolean,
    dataSharing: Boolean,
    // Additional consent fields as needed
});

const UserConsent = mongoose.model('UserConsent', UserConsentSchema);

module.exports = UserConsent;
