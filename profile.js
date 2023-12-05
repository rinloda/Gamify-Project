window.onload = function() {
    var currentUserID = localStorage.getItem("currentUser");
    var currentUser = getUser(currentUserID);
    if (currentUser) {
        document.getElementById("username-display").innerText = currentUser.firstname;
    } else {
        // If no user is logged in, redirect back to the login page
        window.location.href = "login.html";
    }
};
