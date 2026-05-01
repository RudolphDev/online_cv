/**
 * Language Management Module
 * Handles language switching between French and English
 */

(function() {
    'use strict';

    const LANG_KEY = 'language-preference';
    const DEFAULT_LANG = 'fr';
    const SUPPORTED_LANGS = ['fr', 'en'];

    /**
     * Get the stored language preference from localStorage
     * @returns {string} The stored language or default
     */
    function getStoredLanguage() {
        try {
            const stored = localStorage.getItem(LANG_KEY);
            return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
        } catch (e) {
            console.warn('Unable to access localStorage:', e);
            return DEFAULT_LANG;
        }
    }

    /**
     * Store the language preference in localStorage
     * @param {string} lang - The language to store
     */
    function storeLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn(`Language ${lang} is not supported`);
            return;
        }
        try {
            localStorage.setItem(LANG_KEY, lang);
        } catch (e) {
            console.warn('Unable to save to localStorage:', e);
        }
    }

    /**
     * Switch the language of all elements on the page
     * @param {string} lang - The language to switch to
     */
    function switchLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) return;
        
        // Store the preference
        storeLanguage(lang);
        
        // Get all elements with lang attributes
        const elements = document.querySelectorAll('[lang]');
        
        elements.forEach(el => {
            // Show elements with the selected language
            if (el.getAttribute('lang') === lang) {
                el.style.display = '';
            } else {
                // Hide elements with other languages
                el.style.display = 'none';
            }
        });
        
        // Update language switcher display
        updateLanguageSwitcher(lang);
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
    }

    /**
     * Update the language switcher to show the current language
     * @param {string} lang - The current language
     */
    function updateLanguageSwitcher(lang) {
        const langFlag = document.getElementById('lang-flag');
        if (!langFlag) return;
        
        // Hide all flag icons
        const flags = langFlag.querySelectorAll('span');
        flags.forEach(flag => {
            flag.style.display = 'none';
        });
        
        // Show the current language flag
        const currentFlag = langFlag.querySelector(`span[lang="${lang}"]`);
        if (currentFlag) {
            currentFlag.style.display = '';
        }
        
        // Update menu active state
        const menuOptions = document.querySelectorAll('.lang-option');
        menuOptions.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    /**
     * Initialize the language system
     */
    function initLanguage() {
        // Get the initial language
        const lang = getStoredLanguage();
        
        // Apply the language
        switchLanguage(lang);
        
        // Set up language switcher
        const langSwitcher = document.querySelector('.lang-switcher');
        if (langSwitcher) {
            // Click handler for flag
            const langFlag = document.getElementById('lang-flag');
            if (langFlag) {
                langFlag.addEventListener('click', () => {
                    const langMenu = document.getElementById('lang-select');
                    if (langMenu) {
                        langMenu.classList.toggle('show');
                    }
                });
            }
            
            // Click handlers for language options
            const langOptions = document.querySelectorAll('.lang-option');
            langOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.getAttribute('data-lang');
                    switchLanguage(lang);
                    
                    // Hide the menu
                    const langMenu = document.getElementById('lang-select');
                    if (langMenu) {
                        langMenu.classList.remove('show');
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                const langMenu = document.getElementById('lang-select');
                if (langMenu && !langSwitcher.contains(e.target)) {
                    langMenu.classList.remove('show');
                }
            });
            
            // Keyboard navigation for language menu
            const langMenu = document.getElementById('lang-select');
            if (langMenu) {
                langMenu.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        langMenu.classList.remove('show');
                        langFlag.focus();
                    }
                });
            }
        }
    }

    /**
     * Get the current language
     * @returns {string} The current language
     */
    function getCurrentLanguage() {
        return document.documentElement.lang || DEFAULT_LANG;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }

    // Expose API globally
    window.LanguageManager = {
        switch: switchLanguage,
        set: switchLanguage,
        get: getCurrentLanguage,
        init: initLanguage,
        supportedLanguages: SUPPORTED_LANGS
    };

    // Legacy functions for backward compatibility
    window.myfuunc = function(lang) {
        switchLanguage(lang);
    };
    
    window.showww = function() {
        const langMenu = document.getElementById('lang-select');
        if (langMenu) {
            langMenu.classList.add('show');
        }
    };
    
    window.hideee = function() {
        const langMenu = document.getElementById('lang-select');
        if (langMenu) {
            langMenu.classList.remove('show');
        }
    };
})();
