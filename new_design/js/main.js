/**
 * Main JavaScript Module
 * Initializes all components and handles general functionality
 */

(function() {
    'use strict';

    /**
     * Initialize all components
     */
    function initComponents() {
        // Initialize theme manager
        if (window.ThemeManager) {
            window.ThemeManager.init();
        }
        
        // Initialize language manager
        if (window.LanguageManager) {
            window.LanguageManager.init();
        }
        
        // Initialize back to top
        if (window.BackToTopManager) {
            window.BackToTopManager.init();
        }
        
        // Initialize data loader
        if (window.DataLoader) {
            window.DataLoader.init();
        }
    }

    /**
     * Set the current year in the footer
     */
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        if (!menuToggle) return;
        
        // Close menu when clicking on a nav link (for mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close if menu is open (mobile)
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuToggle.checked && 
                !e.target.closest('.header-nav') && 
                !e.target.closest('.menu-button-container')) {
                menuToggle.checked = false;
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    }

    /**
     * Initialize scroll reveal animations
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        // Optionally unobserve after revealing
                        // revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            // Fallback for browsers without IntersectionObserver
            revealElements.forEach(el => el.classList.add('revealed'));
        }
    }

    /**
     * Initialize lazy loading for images
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.loading = 'eager';
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Calculate position with header offset
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    }

    /**
     * Initialize tooltips
     */
    function initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        
        tooltips.forEach(tooltip => {
            // Already handled by CSS, but we can add keyboard support
            tooltip.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Remove focus to hide tooltip
                    tooltip.blur();
                }
            });
        });
    }

    /**
     * Initialize form handling (if any forms exist)
     */
    function initForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add submit handler for validation
            form.addEventListener('submit', (e) => {
                // Basic validation example
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    // Focus on first error
                    const firstError = form.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }
                }
            });
            
            // Clear error on input
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                });
            });
        });
    }

    /**
     * Initialize keyboard navigation
     */
    function initKeyboardNavigation() {
        // Add visible focus styles for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    /**
     * Initialize accessibility features
     */
    function initAccessibility() {
        // Ensure skip link is available
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.removeAttribute('tabindex');
                }
            });
        }
        
        // Add ARIA attributes for better accessibility
        const buttons = document.querySelectorAll('button, [role="button"]');
        buttons.forEach(btn => {
            if (!btn.getAttribute('aria-label') && btn.textContent.trim()) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });
    }

    /**
     * Initialize performance optimizations
     */
    function initPerformance() {
        // Preload critical resources
        const criticalImages = document.querySelectorAll('img[loading="eager"]');
        criticalImages.forEach(img => {
            if (img.complete) return;
            const src = img.getAttribute('src');
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            }
        });
    }

    /**
     * Initialize the main application
     */
    function init() {
        // Set current year
        setCurrentYear();
        
        // Initialize all components
        initComponents();
        
        // Initialize mobile menu
        initMobileMenu();
        
        // Initialize scroll reveal
        initScrollReveal();
        
        // Initialize lazy loading
        initLazyLoading();
        
        // Initialize smooth scroll
        initSmoothScroll();
        
        // Initialize tooltips
        initTooltips();
        
        // Initialize forms
        initForms();
        
        // Initialize keyboard navigation
        initKeyboardNavigation();
        
        // Initialize accessibility
        initAccessibility();
        
        // Initialize performance optimizations
        initPerformance();
        
        // Log initialization
        console.log('CV Website initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API globally
    window.CVApp = {
        init,
        setCurrentYear,
        initMobileMenu,
        initScrollReveal,
        initLazyLoading,
        initSmoothScroll,
        initTooltips,
        initForms,
        initKeyboardNavigation,
        initAccessibility,
        initPerformance
    };
})();

// Load Iconify for icons
if (!document.querySelector('script[src*="iconify"]')) {
    const script = document.createElement('script');
    script.src = 'https://code.iconify.design/1/1.0.7/iconify.min.js';
    script.defer = true;
    document.head.appendChild(script);
}

// Load Google Fonts
if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}
