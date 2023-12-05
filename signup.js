document.getElementById('goBackButton').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirects to login.html
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var userData = {
        firstname: document.getElementById("first-name").value,
        lastname: document.getElementById("last-name").value,
        userid: document.getElementById("user-id").value,
        // In a real-world scenario, never store plaintext passwords
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value
    };

    if (userData.password !== userData.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if(addUser(userData)) {
        alert("Signup successful!");
        window.location.href = "login.html"; // Redirect to the login page
    } else {
        alert("Signup failed. The UserID may already exist.");
    }
});
