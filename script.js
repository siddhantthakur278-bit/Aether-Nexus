/**
 * Project 1: Nav Centainer 
 * The Responsive Grid Architecture
 * Basic State Management & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select the mobile menu toggle button and the main navigation
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    // State to track if the menu is open or closed
    let isMenuOpen = false;

    // Toggle navigation on mobile
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        // Update DOM state
        if (isMenuOpen) {
            mainNav.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mainNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a navigation link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Initialize aria-expanded state for accessibility
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
});