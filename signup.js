document.getElementById('goBackButton').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirects to login.html
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var userData = {
        firstname: document.getElementById("first-name").value,
        lastname: document.getElementById("last-name").value,
        userid: document.getElementById("user-id").value,
        email: document.getElementById("email").value,
        // In a real-world scenario, never store plaintext passwords
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value
    };

    if (userData.password !== userData.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/; // Example: Minimum eight characters, at least one letter and one number
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(userData.email)) {
        alert("Invalid email address.");
        return;
    }

    if (!usernameRegex.test(userData.userid)) {
        alert("Invalid UserID. UserID should be alphanumeric.");
        return;
    }

    if (!passwordRegex.test(userData.password)) {
        alert("Invalid Password. Password must be at least 8 characters, including one letter and one number.");
        return;
    }

    if(addUser(userData)) {
        alert("Signup successful!");
        window.location.href = "login.html"; // Redirect to the login page
    } else {
        alert("Signup failed. The UserID may already exist.");
    }
});
