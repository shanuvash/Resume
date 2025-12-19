// 1. Simple smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// 2. NEW: Visitor Counter Logic for 2025
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/GetCounter')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // This 'data.count' must match the key in your GetCounter.js
            document.getElementById('counter').innerText = `Total Visitors: ${data.count}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('counter').innerText = "Counter unavailable";
        });
});

// send message feature
const AZURE_FUNCTION_URL = "https://resume-message-handler-g7ewg0bfhygbd9a3.centralus-01.azurewebsites.net/api/StoreMessage";

async function sendContactMessage(event) {
    event.preventDefault(); // Stop the page from refreshing

    // 1. Collect data from your HTML form fields
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    // 2. Use fetch() to send the data to your Azure Function
    try {
        const response = await fetch(AZURE_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Message sent! I'll get back to you soon.");
            document.getElementById("contactForm").reset(); // Clear the form
        } else {
            alert("Oops! Something went wrong on the server.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to connect to the server. Check your internet or CORS settings.");
    }
}

// 3. Attach this logic to your form
document.getElementById("contactForm").addEventListener("submit", sendContactMessage);
