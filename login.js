document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var userid = document.getElementById("user-id").value;
    var password = document.getElementById("password").value;

    if (validateUser(userid, password)) {
        // User is valid, store userid in localStorage
        localStorage.setItem("currentUser", userid);
        // Redirect to profile page
        window.location.href = "profile.html";
    } else {
        // Invalid user or password
        alert("Invalid UserID or Password.");
    }
});
