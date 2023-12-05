document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Payment Successful! Thank you for your subscription.");
    window.location.href = "profile.html"; // Redirect back to profile page
});
