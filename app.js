
const splash = document.querySelector(".splash");

document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        splash.addEventListener('animationend', () => {
            splash.style.display = 'none';
        });
        splash.classList.add('fade-in');
    }, 5000);
});





