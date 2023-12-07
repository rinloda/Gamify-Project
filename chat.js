async function fetchMessages() {
    const response = await fetch('/get-messages');
    const messages = await response.json();
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = messages.map(msg => 
        `<p>[${msg.time}] ${msg.userId}: ${msg.text}</p>`).join('');
}

document.getElementById('chatForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value;
    const userId = "UserID"; // Replace with actual user ID
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    await fetch('/post-message', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, time, text: message })
    });

    chatInput.value = ''; // Clear input field
    fetchMessages(); // Refresh the chat messages
});

fetchMessages(); // Fetch messages when the page loads
