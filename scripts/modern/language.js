/**
 * Language Management Module
 * Handles language switching with localStorage persistence
 */

const LanguageManager = {
    STORAGE_KEY: 'language-preference',
    DEFAULT_LANG: 'fr',
    
    /**
     * Initialize language based on stored preference or browser language
     */
    init() {
        const storedLang = localStorage.getItem(this.STORAGE_KEY);
        
        if (storedLang) {
            this.setLanguage(storedLang);
        } else {
            // Detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            const lang = browserLang.startsWith('fr') ? 'fr' : 'en';
            this.setLanguage(lang);
        }
        
        this.updateLanguageElements();
    },
    
    /**
     * Set the language
     * @param {string} lang - 'fr' or 'en'
     */
    setLanguage(lang) {
        localStorage.setItem(this.STORAGE_KEY, lang);
        this.updateLanguageElements();
        this.updateLangFlag();
    },
    
    /**
     * Get current language
     * @returns {string} 'fr' or 'en'
     */
    getCurrentLanguage() {
        return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
    },
    
    /**
     * Toggle between French and English
     */
    toggle() {
        const currentLang = this.getCurrentLanguage();
        const newLang = currentLang === 'fr' ? 'en' : 'fr';
        this.setLanguage(newLang);
    },
    
    /**
     * Update all language-dependent elements
     */
    updateLanguageElements() {
        const currentLang = this.getCurrentLanguage();
        const elements = document.querySelectorAll('[lang]');
        
        elements.forEach(el => {
            // Hide all language elements
            el.style.display = 'none';
            
            // Show only the current language
            if (el.getAttribute('lang') === currentLang) {
                el.style.display = '';
            }
        });
    },
    
    /**
     * Update language flag icon
     */
    updateLangFlag() {
        const flagElement = document.getElementById('lang-flag');
        if (!flagElement) return;
        
        const currentLang = this.getCurrentLanguage();
        const flags = flagElement.querySelectorAll('span[lang]');
        
        flags.forEach(flag => {
            flag.style.display = flag.getAttribute('lang') === currentLang ? 'inline' : 'none';
        });
    }
};

// Initialize language on DOM load
document.addEventListener('DOMContentLoaded', () => {
    LanguageManager.init();
});

// Also run immediately in case script is loaded after DOM
if (document.readyState !== 'loading') {
    LanguageManager.init();
}

// Legacy compatibility functions (for existing code)
function myfuunc(lang) {
    LanguageManager.setLanguage(lang);
}

function showww() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.style.display = 'block';
    }
}

function hideee() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.style.display = 'none';
    }
}
