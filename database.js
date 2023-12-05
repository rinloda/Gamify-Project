// This script uses localStorage as a simple NoSQL database


function addUser(userData) {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[userData.userid]) {
        return false; // User already exists
    } else {
        users[userData.userid] = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            // Hash the password - this is a placeholder for demonstration purposes
            // In a real application, you should hash the password
            password: userData.password 
        };
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
}

function validateUser(userid, password) {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    var user = users[userid];
    
    if (user && user.password === hashPassword(password)) {
        return true;
    } else {
        return false;
    }
}

function hashPassword(password) {
    // Placeholder for password hashing function
    return password; // In a real app, use a library like bcrypt
}

function getUser(userid) {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    return users[userid];
}
