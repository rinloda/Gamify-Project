async function fetchAndDisplayComments() {
    const response = await fetch('/comments');
    const comments = await response.json();
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Clear existing comments

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <p>${comment.user} at ${new Date(comment.createdAt).toLocaleString()}: ${comment.text}</p>
            <div>
                ${comment.feedback.map(fb => `<p>Feedback by ${fb.user}: ${fb.text}</p>`).join('')}
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

document.getElementById('newCommentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value;
    const userId = "someUserId"; // Replace with actual user ID logic

    await fetch('/submit-comment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user: userId, text: commentText })
    });

    document.getElementById('commentText').value = ''; // Clear the textarea
    fetchAndDisplayComments(); // Refresh the comments list
});

fetchAndDisplayComments();
