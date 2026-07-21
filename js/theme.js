const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

const lightCodeTheme = document.getElementById('theme-light');
const darkCodeTheme = document.getElementById('theme-dark');

if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');

    if (lightCodeTheme && darkCodeTheme) {
        lightCodeTheme.disabled = true;
        darkCodeTheme.disabled = false;
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');

    if (theme === 'dark') {
        document.body.removeAttribute('data-theme');
        if (lightCodeTheme && darkCodeTheme) {
            darkCodeTheme.disabled = true;
            lightCodeTheme.disabled = false;
        }
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        if (lightCodeTheme && darkCodeTheme) {
            lightCodeTheme.disabled = true;
            darkCodeTheme.disabled = false;
        }
        localStorage.setItem('theme', 'dark');
    }
})