/**
 * Theme Management Module
 * Handles light/dark theme switching with localStorage persistence
 */

const ThemeManager = {
    STORAGE_KEY: 'theme-preference',
    
    /**
     * Initialize theme based on stored preference or system preference
     */
    init() {
        const storedTheme = localStorage.getItem(this.STORAGE_KEY);
        
        if (storedTheme) {
            this.setTheme(storedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },
    
    /**
     * Set the theme
     * @param {string} theme - 'light' or 'dark'
     */
    setTheme(theme) {
        const html = document.documentElement;
        
        // Always set data-theme attribute (either 'light' or 'dark')
        html.setAttribute('data-theme', theme);
        
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateToggleButton();
    },
    
    /**
     * Toggle between light and dark theme
     */
    toggle() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    
    /**
     * Get current theme
     * @returns {string} 'light' or 'dark'
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },
    
    /**
     * Update toggle button icon based on current theme
     */
    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        
        const icon = toggleBtn.querySelector('iconify-icon');
        if (!icon) return;
        
        const currentTheme = this.getCurrentTheme();
        icon.setAttribute('icon', currentTheme === 'dark' ? 'ph:sun' : 'ph:moon');
    }
};

// Initialize theme on DOM load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});

// Also run immediately in case script is loaded after DOM
if (document.readyState !== 'loading') {
    ThemeManager.init();
}
