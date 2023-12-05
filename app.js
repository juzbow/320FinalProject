"use strict";
console.log(jQuery.fn.jquery);
$(document).ready(function() {
    handleSplashScreen();
    handleLoginForm();
    handleResetClick();
    handleRegisterSubmit();
    favdate();
    handleLocalStorage()

});

function handleSplashScreen() {
    const splash = $(".splash");

    setTimeout(() => {
        splash.on('animationend', () => {
            splash.addClass('animation-done');
        });
        splash.addClass('fade-in');
    }, 5000);
}






function handleLoginForm() {
    const loginForm = $('#login-form');
    const welcomeMessageHolder = $('#login-error-msg-holder');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    const check = $("#check");
    const password = $("#password-field");
    const errorMsg = $("#login-error-msg");
    const dropdownLogin = $('#dropdown-login');

    if (check && password && loginForm && errorMsg) {
        check.on('click', togglePassword);

        if (isLoggedIn && username) {
            
            loginForm.hide();
            welcomeMessageHolder.html('<div id = "welcome-message-container"><p id="welcome-message">Welcome to Gentle Wake</p></div>');

            
            dropdownLogin.text('Logout');
            dropdownLogin.attr('href', '#');
            dropdownLogin.off('click').on('click', function () {
                
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            });
            $('.dropdown-content #dropdown-reg').hide();
        } else {
            
            dropdownLogin.text('Login');  
            dropdownLogin.attr('href', 'index.html');  
            $('.dropdown-content #dropdown-reg').show();
        }

        loginForm.submit(function (e) {
            e.preventDefault();
            toggleError(false);

            const enteredUsername = $('#username-field').val();
            const enteredPassword = $('#password-field').val();

            if (enteredUsername === 'user' && enteredPassword === 'password') {
                
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', enteredUsername);

                loginForm.hide();
                welcomeMessageHolder.html('<div id = "welcome-message-container"><p id="welcome-message">Welcome to Gentle Wake</p></div>');

                
                dropdownLogin.text('Logout');
                dropdownLogin.attr('href', '#');
                dropdownLogin.off('click').on('click', function () {
                    
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('username');
                    window.location.reload();
                });
                $('.dropdown-content #dropdown-reg').hide();
            } else {
                
                toggleError(true);
            }
        });
    } else {
        console.error("One or more elements not found");
    }

    function togglePassword() {
        password.attr('type', check.prop('checked') ? "text" : "password");
    }

    function toggleError(showError) {
        errorMsg.css('opacity', showError ? 1 : 0);
    }
}



function handleResetClick() {
    const reset = $("#reset");

    if (reset) {
        reset.click(function() {
            $("#firstname, #lastname, #email, #email2, #password, #phone, #message, #state, #zipcode").val("");

            window.location.hash = '';
            window.location.reload();
            window.scrollTo(0, 0);
        });
    } else {
        console.error("Reset button not found");
    }
}

function handleRegisterSubmit() {
    $("#registration-form").submit(function (e) {
        console.log('handleRegisterSubmit function called');

        let isValid = true;

        
        const email = $("#email").val().trim();
        const email2 = $("#email2").val().trim();
      
        if (email2 !== email) {
            $("#email-match-error").text("Emails do not match.");
            isValid = false;
        } else {
            $("#email-match-error").text("");
        }


        if (!isValid) {
            e.preventDefault(); 
            console.log('Form validation failed');
        } else {
            console.log('Registration successful');
            
        }
    });
}


function favdate(){
    const dateInput = $("#favdate");

    dateInput.datepicker();
    dateInput.focus(function () {
        dateInput.datepicker('show');
    });
}

function handleLocalStorage() {
    console.log('handleLocalStorage function called');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    updateNavigationBar(isLoggedIn, username);

    
    $(window).on('storage', function (e) {
        if (e.originalEvent.key === 'isLoggedIn' || e.originalEvent.key === 'username') {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const username = localStorage.getItem('username');
            updateNavigationBar(isLoggedIn, username);
        }
    });
}



function updateNavigationBar(isLoggedIn, username) {
    const dropdownLogin = $('#dropdown-login');
    const originalLogin = $('#original-login-content');
    const originalRegister = $('#original-register-content');

    if (isLoggedIn) {
       
        dropdownLogin.text('Logout');
        dropdownLogin.attr('href', '#');
        dropdownLogin.off('click').on('click', function () {
            
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.reload();
        });

        
        originalLogin.hide();
        originalRegister.hide();
    } else {
        
        dropdownLogin.text('Login');
        dropdownLogin.attr('href', 'index.html');
        originalLogin.show();
        originalRegister.show();
    }
}






        			