/**
 * Back to Top Module
 * Handles the back to top button functionality
 */

(function() {
    'use strict';

    const SCROLL_THRESHOLD = 300;
    const SCROLL_DURATION = 500;

    /**
     * Scroll to the top of the page smoothly
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Check if the back to top button should be visible
     * @returns {boolean} True if button should be visible
     */
    function shouldShowButton() {
        return window.pageYOffset > SCROLL_THRESHOLD;
    }

    /**
     * Update the back to top button visibility
     */
    function updateButtonVisibility() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        if (shouldShowButton()) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    /**
     * Initialize the back to top functionality
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        // Set up click handler
        backToTopBtn.addEventListener('click', scrollToTop);
        
        // Add keyboard support
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
        
        // Set up scroll listener
        window.addEventListener('scroll', updateButtonVisibility, { passive: true });
        
        // Initial check
        updateButtonVisibility();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }

    // Expose API globally
    window.BackToTopManager = {
        scrollToTop,
        updateVisibility: updateButtonVisibility,
        init: initBackToTop
    };
})();
