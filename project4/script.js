/**
 * Decode Labs | Project 4: Form Design & Validation
 * Engineering the Architecture of Trust
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const successState = document.getElementById('success-state');
    
    // Scanners (Regex Inspectors)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPolicy = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!?@$%^&*#-]).{8,}$/;

    // Input Fields
    const fields = {
        name: document.getElementById('full-name'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirm: document.getElementById('confirm-password')
    };

    // Error Labels
    const errors = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        password: document.getElementById('password-error'),
        confirm: document.getElementById('confirm-error')
    };

    /**
     * Phase 2: Preventing the Memory Wipe
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Activate Fail-Safe: Prevent Refresh
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirm();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            executeRegistration();
        }
    });

    /**
     * Phase 3: The Communicator (Dynamic UI Feedback)
     */
    function validateName() {
        if (fields.name.value.length < 3) {
            showError('name', 'Identity name must be at least 3 characters');
            return false;
        }
        clearError('name');
        return true;
    }

    function validateEmail() {
        if (!emailRegex.test(fields.email.value)) {
            showError('email', 'Invalid architectural email format');
            return false;
        }
        clearError('email');
        return true;
    }

    function validatePassword() {
        const val = fields.password.value;
        const meter = document.querySelector('.meter-bar');
        
        // Dynamic Meter Update
        let strength = 0;
        if (val.length >= 8) strength += 25;
        if (/[A-Z]/.test(val)) strength += 25;
        if (/[0-9]/.test(val)) strength += 25;
        if (/[#!?@$%^&*#-]/.test(val)) strength += 25;

        meter.style.width = strength + '%';
        meter.style.background = strength < 50 ? '#D9534F' : (strength < 100 ? '#F0AD4E' : '#5CB85C');

        if (!passwordPolicy.test(val)) {
            showError('password', 'Strict Policy: 8+ chars, Upper, Lower, Number, Symbol');
            return false;
        }
        clearError('password');
        return true;
    }

    function validateConfirm() {
        if (fields.confirm.value !== fields.password.value) {
            showError('confirm', 'Access tokens do not match');
            return false;
        }
        clearError('confirm');
        return true;
    }

    function showError(field, message) {
        fields[field].classList.add('invalid');
        fields[field].setAttribute('aria-invalid', 'true');
        errors[field].textContent = message;
    }

    function clearError(field) {
        fields[field].classList.remove('invalid');
        fields[field].setAttribute('aria-invalid', 'false');
        errors[field].textContent = '';
    }

    function executeRegistration() {
        const btn = document.querySelector('.btn-submit');
        btn.innerHTML = '<span class="btn-text">Processing Payload...</span>';
        btn.disabled = true;

        // Simulate Neural Persistence Delay
        setTimeout(() => {
            form.classList.add('hidden');
            successState.classList.remove('hidden');
        }, 1500);
    }

    // Real-time Inspection
    fields.password.addEventListener('input', validatePassword);
    fields.confirm.addEventListener('input', validateConfirm);
});
