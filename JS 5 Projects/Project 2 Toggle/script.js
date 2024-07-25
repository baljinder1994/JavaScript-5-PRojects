// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const themeSwitch = document.getElementById('theme-switch');
  
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.body.classList.add(currentTheme);
      if (currentTheme === 'dark-mode') {
        themeSwitch.checked = true;
      }
    }
  
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
      }
    });
  });
  