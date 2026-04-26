/**
 * Aether Nexus Gateway Framework
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
                if (latencyEl) latencyEl.textContent = data.latency;
                if (usersEl) usersEl.textContent = data.totalUsers;
                if (resilienceEl) resilienceEl.textContent = data.status === 'Healthy' ? 'Active' : 'Warning';
            }
        } catch (error) {
            if (latencyEl) latencyEl.textContent = 'Offline';
            if (resilienceEl) resilienceEl.textContent = 'Critical';
        }
    }

    async function fetchTaskEngineStatus() {
        const p3El = document.getElementById('stat-p3');
        try {
            const response = await fetch('http://localhost:3001/health');
            if (response.ok) {
                if (p3El) {
                    p3El.textContent = 'ONLINE';
                    p3El.style.color = '#A0D4E0';
                }
            }
        } catch (error) {
            if (p3El) {
                p3El.textContent = 'OFFLINE';
                p3El.style.color = '#D9534F';
            }
        }
    }

    // Initial fetch and periodic pulse (every 10 seconds)
    fetchSystemStats();
    fetchTaskEngineStatus();
    setInterval(fetchSystemStats, 10000);
    setInterval(fetchTaskEngineStatus, 15000);

    // Simple Navbar Interactivity
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
});