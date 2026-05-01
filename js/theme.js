/**
 * Theme Management Module
 * Handles dark/light theme switching with localStorage persistence
 * and system preference detection
 */

(function() {
    'use strict';

    const THEME_KEY = 'theme-preference';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    /**
     * Get the user's system color scheme preference
     * @returns {string} 'dark' or 'light'
     */
    function getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
    }

    /**
     * Get the stored theme preference from localStorage
     * @returns {string|null} The stored theme or null if not set
     */
    function getStoredPreference() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (e) {
            console.warn('Unable to access localStorage:', e);
            return null;
        }
    }

    /**
     * Store the theme preference in localStorage
     * @param {string} theme - The theme to store ('dark' or 'light')
     */
    function storePreference(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            console.warn('Unable to save to localStorage:', e);
        }
    }

    /**
     * Apply the theme to the document
     * @param {string} theme - The theme to apply ('dark' or 'light')
     */
    function applyTheme(theme) {
        const html = document.documentElement;
        
        if (theme === DARK_THEME) {
            html.setAttribute('data-theme', DARK_THEME);
        } else {
            html.removeAttribute('data-theme');
        }
        
        // Update theme toggle button icon
        updateThemeIcon(theme);
        
        // Dispatch custom event for other components to react
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    /**
     * Update the theme toggle button icon based on current theme
     * @param {string} theme - The current theme ('dark' or 'light')
     */
    function updateThemeIcon(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        
        const icon = toggleBtn.querySelector('iconify-icon');
        if (!icon) return;
        
        // Update icon based on theme
        icon.setAttribute('icon', theme === DARK_THEME ? 'ph:sun' : 'ph:moon');
    }

    /**
     * Get the current theme
     * @returns {string} The current theme ('dark' or 'light')
     */
    function getCurrentTheme() {
        const stored = getStoredPreference();
        if (stored) {
            return stored;
        }
        return getSystemPreference();
    }

    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        
        applyTheme(newTheme);
        storePreference(newTheme);
    }

    /**
     * Initialize the theme system
     */
    function initTheme() {
        // Apply initial theme
        const theme = getCurrentTheme();
        applyTheme(theme);
        
        // Set up theme toggle button
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
            
            // Add keyboard support
            toggleBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            const stored = getStoredPreference();
            if (!stored) {
                applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
            }
        });
    }

    /**
     * Check if dark theme is currently active
     * @returns {boolean} True if dark theme is active
     */
    function isDarkTheme() {
        return document.documentElement.getAttribute('data-theme') === DARK_THEME;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Expose API globally
    window.ThemeManager = {
        toggle: toggleTheme,
        set: (theme) => {
            if (theme === DARK_THEME || theme === LIGHT_THEME) {
                applyTheme(theme);
                storePreference(theme);
            }
        },
        get: getCurrentTheme,
        isDark: isDarkTheme,
        init: initTheme
    };
})();
