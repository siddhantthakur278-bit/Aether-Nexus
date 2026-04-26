/**
 * Decode Labs Intern Portal
 * Basic State Management & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select the sidebar toggle button and the sidebar
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const appSidebar = document.getElementById('app-sidebar');
    
    // State to track if the sidebar is open or closed on mobile
    let isSidebarOpen = false;

    // Toggle sidebar on mobile
    sidebarToggleBtn.addEventListener('click', () => {
        isSidebarOpen = !isSidebarOpen;
        
        // Update DOM state
        if (isSidebarOpen) {
            appSidebar.classList.add('open');
            sidebarToggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            appSidebar.classList.remove('open');
            sidebarToggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close sidebar when a navigation link is clicked (useful on mobile)
    const navLinks = appSidebar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            
            // Add active class to clicked link
            e.currentTarget.classList.add('active');
            e.currentTarget.setAttribute('aria-current', 'page');

            // Close sidebar on mobile
            if (window.innerWidth < 1024 && isSidebarOpen) {
                isSidebarOpen = false;
                appSidebar.classList.remove('open');
                sidebarToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 && isSidebarOpen) {
            const isClickInsideSidebar = appSidebar.contains(e.target);
            const isClickOnToggle = sidebarToggleBtn.contains(e.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle) {
                isSidebarOpen = false;
                appSidebar.classList.remove('open');
                sidebarToggleBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});