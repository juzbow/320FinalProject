document.addEventListener('DOMContentLoaded', (e) => {
    handleSplashScreen();
    handleLoginForm();
});

function handleSplashScreen() {
    const splash = document.querySelector(".splash");

    setTimeout(() => {
        splash.addEventListener('animationend', () => {
            splash.classList.add('animation-done');
        });
        splash.classList.add('fade-in');
    }, 5000);
}

function handleLoginForm() {
    const check = document.querySelector("#check");
    const password = document.querySelector("#password-field");
    const loginForm = document.querySelector("#login-form");
    const errorMsg = document.querySelector("#login-error-msg");

    if (check && password && loginForm && errorMsg) {
        check.addEventListener('click', togglePassword);

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            toggleError(false);

            const username = document.getElementById('username-field').value;
            const enteredPassword = document.getElementById('password-field').value;

            
            if (username === 'user' && enteredPassword === 'password') {
                console.log('Login successful');
                
                window.location.href = 'about.html';
            } else {
                toggleError(true);
            }
        });
    } else {
        console.error("One or more elements not found");
    }

    function togglePassword() {
        password.type = check.checked ? "text" : "password";
    }

    function toggleError(showError) {
        if (showError) {
            errorMsg.style.opacity = 1;
        } else {
            errorMsg.style.opacity = 0;
        }
    }
}

