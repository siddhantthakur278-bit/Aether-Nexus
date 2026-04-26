# Project 4: Form Design & Validation

Engineering the **Architecture of Trust** through high-fidelity form design and intelligent inspection.

## 🏗️ The IPO Pipeline
This project implements the full **Input-Process-Output** model as defined in the architectural slides:
1. **Stage 1: Input (The Structure)**: Built using the **Semantic Skeleton** pattern, ensuring proper use of `<form>`, `<label>`, and `<input>` tags for maximum accessibility.
2. **Stage 2: Process (The Gatekeeper)**: Advanced JavaScript logic using **The Regex Inspector** to enforce strict data patterns.
3. **Stage 3: Output (The Communicator)**: Dynamic UI feedback with branded error states and success transitions.

## 🛡️ Security Features
- **Strict Password Policy**: Regex-based enforcement of complexity (Uppercase, Lowercase, Number, Symbol, 8+ chars).
- **The Default Threat Overridden**: Custom `preventDefault()` logic to stop uncontrolled page refreshes and preserve application state.
- **Email Reality Check**: Syntax-based validation using RFC 5322 standards.

## 🎨 Design Excellence
- **Palette**: Mocha Mousse (#A5956F) and Ethereal Blue (#A0D4E0).
- **Aesthetic**: Glassmorphism with real-time feedback (Password Strength Meter).
- **Interactivity**: Fluid transitions and micro-animations on error/success states.

## 🚀 Execution
Open `index.html` in any modern browser to interact with the registration interface.
