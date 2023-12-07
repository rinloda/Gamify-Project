async function fetchComments() {
    try {
        const response = await fetch('/get-comments');
        const comments = await response.json();
        const commentsContainer = document.getElementById('commentsContainer');
        commentsContainer.innerHTML = comments.map(comment => 
            `<p>[${comment.time}] ${comment.userId}: ${comment.text}</p>`).join('');
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

document.getElementById('newCommentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const commentInput = document.getElementById('commentText');
    const comment = commentInput.value;

    // Retrieve UserID from localStorage
    const userId = localStorage.getItem("currentUser"); // Replace "currentUser" with your actual key for user ID

    // Format the time to display only hours and minutes
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
        await fetch('/post-comment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, time, text: comment })
        });
        commentInput.value = ''; // Clear textarea
        fetchComments(); // Refresh the comments list
    } catch (error) {
        console.error('Error posting comment:', error);
    }
});

fetchComments(); // Fetch comments when the page loads
