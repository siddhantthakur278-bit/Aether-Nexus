/**
 * Decode Labs Gateway Framework
 * Live Dashboard Integration
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selectors for Vital Signs
    const latencyEl = document.getElementById('stat-latency');
    const usersEl = document.getElementById('stat-users');
    const resilienceEl = document.getElementById('stat-resilience');

    /**
     * Fetch System Stats from Project 2 API
     */
    async function fetchSystemStats() {
        try {
            const response = await fetch('http://localhost:3000/api/v1/stats');
            const result = await response.json();

            if (result.status === 'success') {
                const { data } = result;
                
                // Update UI with real data
                if (latencyEl) latencyEl.textContent = data.latency;
                if (usersEl) usersEl.textContent = data.totalUsers;
                if (resilienceEl) resilienceEl.textContent = data.status === 'Healthy' ? 'Active' : 'Warning';
                
                console.log('Architectural stats synchronized.');
            }
        } catch (error) {
            console.error('Failed to pulse system stats:', error);
            if (latencyEl) latencyEl.textContent = 'Offline';
            if (resilienceEl) resilienceEl.textContent = 'Critical';
        }
    }

    // Initial fetch and periodic pulse (every 10 seconds)
    fetchSystemStats();
    setInterval(fetchSystemStats, 10000);

    // Simple Navbar Interactivity
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
});