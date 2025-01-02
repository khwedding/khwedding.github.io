// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) {
        return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Toggle theme
const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
};

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());
});

// Make toggleTheme available globally
window.toggleTheme = toggleTheme;