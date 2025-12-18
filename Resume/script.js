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
