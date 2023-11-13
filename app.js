
const splash = document.querySelector(".splash");

document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        splash.addEventListener('animationend', () => {
            splash.style.display = 'none';
        });
        splash.classList.add('fade-in');
    }, 5000);



    const check = document.querySelector("#check");
    const password = document.querySelector("#password-field");
    const loginForm = document.querySelector("#login-form");
    const errorMsg = document.querySelector("#login-error-msg");

    const togglePassword = () => {
        password.type = check.checked ? "text" : "password";
    };

    if (check && password && loginForm && errorMsg) {
        check.addEventListener('click', togglePassword);

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            errorMsg.style.display = 'none';

            const username = document.getElementById('username-field').value;
            const enteredPassword = document.getElementById('password-field').value;

            // Example: Check if username and password are correct
            if (username === 'user' && enteredPassword === 'password') {
                console.log('Login successful');
            } else {
                errorMsg.style.display = 'block';
            }
        });
    } else {
        console.error("not found");
    }
});












