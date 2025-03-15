// theme-toggle.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkStyle = document.getElementById('theme-style');
    const lightStyle = document.getElementById('light-style');

    // Function to set the theme based on localStorage
    function setTheme(isLight) {
        if (isLight) {
            darkStyle.disabled = true;
            lightStyle.disabled = false;
            if (themeToggle) {
                themeToggle.classList.add('light');
            }
        } else {
            darkStyle.disabled = false;
            lightStyle.disabled = true;
            if (themeToggle) {
                themeToggle.classList.remove('light');
            }
        }
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Retrieve theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTheme(lightStyle.disabled); // Toggle based on current state
        });
    }
});
