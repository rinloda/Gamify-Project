document.addEventListener('DOMContentLoaded', function () {
    // Handle 'Go Back' button click
    document.getElementById('goBackButton').addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirects to the login page
    });

    // Handle OTP form submission
    document.getElementById('otpForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var otp = document.getElementById('otp').value;

        // Check if the entered OTP is the correct one (123456)
        if (otp === '123456') {
            // Redirect to the profile page if OTP is correct
            window.location.href = 'profile.html';
        } else {
            // Alert the user if the OTP is incorrect
            alert('Invalid OTP. Please try again.');
        }
    });
});
