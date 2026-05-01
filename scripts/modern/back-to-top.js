/**
 * Back to Top Button Module
 * Shows/hides back to top button based on scroll position
 */

const BackToTop = {
    button: null,
    scrollThreshold: 300,
    
    /**
     * Initialize the back to top button
     */
    init() {
        this.button = document.getElementById('back-to-top');
        
        if (!this.button) {
            // Create button if it doesn't exist
            this.createButton();
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Initial check
        this.handleScroll();
    },
    
    /**
     * Create back to top button dynamically
     */
    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'back-to-top';
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.innerHTML = '<iconify-icon icon="ph:arrow-up" style="color: white; font-size: 24px;"></iconify-icon>';
        this.button.addEventListener('click', () => this.scrollToTop());
        
        document.body.appendChild(this.button);
    },
    
    /**
     * Handle scroll events
     */
    handleScroll() {
        if (!this.button) return;
        
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollY > this.scrollThreshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    /**
     * Scroll to top of page
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    BackToTop.init();
});

// Also run immediately in case script is loaded after DOM
if (document.readyState !== 'loading') {
    BackToTop.init();
}

// Legacy compatibility function
function topFunction() {
    BackToTop.scrollToTop();
}
