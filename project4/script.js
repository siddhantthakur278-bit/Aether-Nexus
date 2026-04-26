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

    async function executeRegistration() {
        const btn = document.querySelector('.btn-submit');
        const btnText = btn.querySelector('.btn-text');
        
        btnText.textContent = 'Transmitting to Gateway...';
        btn.disabled = true;

        const payload = {
            name: fields.name.value,
            email: fields.email.value,
            password: fields.password.value,
            passwordConfirm: fields.confirm.value
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Transmission Failed');
            }

            // Success Transition
            form.classList.add('hidden');
            successState.classList.remove('hidden');
            
        } catch (err) {
            btnText.textContent = 'Execute Registration';
            btn.disabled = false;
            showError('confirm', `Gateway Error: ${err.message}`);
        }
    }

    // Real-time Inspection
    fields.password.addEventListener('input', validatePassword);
    fields.confirm.addEventListener('input', validateConfirm);
});
