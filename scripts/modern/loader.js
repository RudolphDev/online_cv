/**
 * Dynamic Content Loader Module
 * Replaces jQuery's .load() functionality with vanilla JavaScript
 */

const ContentLoader = {
    /**
     * Load HTML content into an element
     * @param {string} elementId - ID of the target element
     * @param {string} url - URL of the HTML file to load
     * @param {Function} callback - Optional callback function
     */
    load(elementId, url, callback) {
        const target = document.getElementById(elementId);
        if (!target) {
            console.warn(`ContentLoader: Element with ID "${elementId}" not found`);
            return;
        }
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Extract body content (handle both full HTML and fragments)
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.body.innerHTML || html;
                
                target.innerHTML = bodyContent;
                
                // Re-initialize scripts and components in loaded content
                this.initializeScripts(target);
                
                // Execute callback if provided
                if (callback && typeof callback === 'function') {
                    callback();
                }
            })
            .catch(error => {
                console.error(`ContentLoader: Failed to load "${url}":`, error);
                target.innerHTML = `<div class="alert alert-error">Error loading content: ${error.message}</div>`;
            });
    },
    
    /**
     * Load multiple contents at once
     * @param {Object} elements - Object with elementId: url pairs
     * @param {Function} callback - Optional callback when all loads complete
     */
    loadMultiple(elements, callback) {
        const promises = [];
        
        for (const [elementId, url] of Object.entries(elements)) {
            promises.push(
                new Promise((resolve) => {
                    this.load(elementId, url, resolve);
                })
            );
        }
        
        Promise.all(promises).then(() => {
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    },
    
    /**
     * Initialize scripts in dynamically loaded content
     * @param {HTMLElement} container - Container element
     */
    initializeScripts(container) {
        // Re-initialize theme manager for new content
        if (typeof ThemeManager !== 'undefined') {
            ThemeManager.updateToggleButton();
        }
        
        // Re-initialize language manager for new content
        if (typeof LanguageManager !== 'undefined') {
            LanguageManager.updateLanguageElements();
        }
        
        // Add animation classes to new elements
        const animateElements = container.querySelectorAll('.card, .experience-card, .formation-card, .publication-card');
        animateElements.forEach((el, index) => {
            el.classList.add('animate-fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }
};

// jQuery compatibility layer
declare const $: any;

// Extend window to support jQuery-like syntax
interface Window {
    $: any;
}

// Create a simple jQuery-like object for compatibility
const jQueryCompat = {
    ready: function(callback) {
        if (document.readyState !== 'loading') {
            callback(jQueryCompat);
        } else {
            document.addEventListener('DOMContentLoaded', () => callback(jQueryCompat));
        }
    },
    
    load: function(url) {
        // This would be used as $('#element').load(url)
        // We need to handle it differently
        return {
            load: function(url, callback?) {
                // This is a bit tricky - we need to know which element
                // For now, we'll just log a warning
                console.warn('jQuery .load() called in a way that needs element context');
            }
        };
    }
};

// Make $ available globally
window.$ = jQueryCompat;

// Also create the jQuery function
window.jQuery = jQueryCompat;

// Override the load method to work with our ContentLoader
declare global {
    interface JQuery {
        load(url: string, callback?: Function): JQuery;
    }
}

// Extend the jQuery-like object
jQueryCompat.fn = jQueryCompat.prototype = {
    load: function(url, callback?) {
        // This is called as $('#element').load(url)
        // We need to get the element ID from the selector
        const selector = this.selector || '';
        const elementId = selector.replace('#', '');
        
        ContentLoader.load(elementId, url, callback);
        return this;
    },
    
    selector: ''
};

// Create the $ function that can handle selectors
window.$ = function(selector) {
    if (selector === window || selector === document) {
        return jQueryCompat;
    }
    
    if (typeof selector === 'string') {
        const element = document.querySelector(selector);
        if (element) {
            const instance = Object.create(jQueryCompat.fn);
            instance.selector = selector;
            instance[0] = element;
            instance.length = 1;
            return instance;
        }
    }
    
    return jQueryCompat;
};

// Make sure jQuery is also available
window.jQuery = window.$;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Auto-load any elements with data-load attribute
    const loadElements = document.querySelectorAll('[data-load]');
    loadElements.forEach(el => {
        const url = el.getAttribute('data-load');
        if (url) {
            ContentLoader.load(el.id, url);
        }
    });
});
