/**
 * Main JavaScript File
 * Initializes all modules and handles global functionality
 */

// ============================================
// Module Imports (will be loaded via script tags)
// ============================================

// Theme Manager (loaded via script tag)
// Language Manager (loaded via script tag)
// BackToTop (loaded via script tag)
// ContentLoader (loaded via script tag)

// ============================================
// Global Configuration
// ============================================

const CVConfig = {
    // Site metadata
    siteName: 'Thomas Renne - CV',
    siteDescription: 'Bioinformatics PhD Student - Thomas Renne CV',
    siteAuthor: 'Thomas Renne',
    
    // Social links
    socialLinks: {
        github: 'https://github.com/RudolphDev',
        orcid: 'https://orcid.org/0000-0002-1401-1806',
        linkedin: 'https://www.linkedin.com/in/thomas-renne/',
        email: 'mailto:thomas.renne@outlook.fr'
    },
    
    // Animation settings
    animations: {
        enabled: true,
        duration: '0.5s',
        delay: '0.1s'
    },
    
    // Performance settings
    performance: {
        lazyLoading: true,
        prefetch: true
    }
};

// ============================================
// DOM Content Loaded
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initializeModules();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load dynamic content
    loadDynamicContent();
    
    // Initialize animations
    initializeAnimations();
    
    // Set up performance optimizations
    setupPerformance();
    
    console.log('CV Website initialized successfully');
});

// ============================================
// Module Initialization
// ============================================

function initializeModules() {
    // These are initialized automatically via their own DOMContentLoaded listeners
    // But we can ensure they're loaded here
    
    // Theme Manager
    if (typeof ThemeManager !== 'undefined') {
        ThemeManager.init();
    }
    
    // Language Manager
    if (typeof LanguageManager !== 'undefined') {
        LanguageManager.init();
    }
    
    // Back to Top
    if (typeof BackToTop !== 'undefined') {
        BackToTop.init();
    }
    
    // Content Loader
    if (typeof ContentLoader !== 'undefined') {
        // Already initialized via DOMContentLoaded
    }
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (typeof ThemeManager !== 'undefined') {
                ThemeManager.toggle();
            }
        });
    }
    
    // Language switcher
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = option.getAttribute('data-lang') || 
                        option.id.replace('text', '').toLowerCase();
            if (typeof LanguageManager !== 'undefined') {
                LanguageManager.setLanguage(lang);
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('change', (e) => {
            const menu = document.querySelector('.header-nav');
            if (menu) {
                menu.classList.toggle('mobile-open', e.target.checked);
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle && menuToggle.checked) {
                    menuToggle.checked = false;
                    const menu = document.querySelector('.header-nav');
                    if (menu) {
                        menu.classList.remove('mobile-open');
                    }
                }
            }
        });
    });
    
    // Intersection Observer for animations
    if (CVConfig.animations.enabled) {
        setupIntersectionObserver();
    }
}

// ============================================
// Dynamic Content Loading
// ============================================

function loadDynamicContent() {
    // Load header, footer, and other common elements
    const elementsToLoad = [
        { id: 'header', url: 'header.html' },
        { id: 'footer', url: 'footer.html' }
    ];
    
    elementsToLoad.forEach(({ id, url }) => {
        const element = document.getElementById(id);
        if (element && element.innerHTML.trim() === '') {
            if (typeof ContentLoader !== 'undefined') {
                ContentLoader.load(id, url);
            }
        }
    });
}

// ============================================
// Animations
// ============================================

function initializeAnimations() {
    // Add animation classes to elements
    const animateOnLoad = document.querySelectorAll('.card, .experience-card, .formation-card, .publication-card, .section');
    animateOnLoad.forEach((el, index) => {
        el.classList.add('animate-fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.animationDelay = `${entry.target.dataset.animationDelay || '0'}s`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Performance Optimizations
// ============================================

function setupPerformance() {
    // Lazy loading for images
    if (CVConfig.performance.lazyLoading) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.loading = 'lazy';
            img.src = img.dataset.src;
        });
    }
    
    // Prefetch important links
    if (CVConfig.performance.prefetch) {
        const importantLinks = document.querySelectorAll('a[href^="https:"], a[href^="http:"]');
        importantLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkElement = document.createElement('link');
                linkElement.rel = 'prefetch';
                linkElement.href = href;
                document.head.appendChild(linkElement);
            }
        });
    }
    
    // Defer non-critical scripts
    const deferScripts = document.querySelectorAll('script[data-defer]');
    deferScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.defer = true;
        newScript.async = false;
        script.parentNode.replaceChild(newScript, script);
    });
}

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit execution rate
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit execution rate
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Format date for display
 */
function formatDate(dateString, locale = 'en-US') {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(locale, options);
}

// ============================================
// Export for use in other modules
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CVConfig,
        debounce,
        throttle,
        isInViewport,
        formatDate
    };
}
