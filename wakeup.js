
"use strict";

let loggedInUser = localStorage.getItem('loggedInUser');
let configData = [];

function login() {

  const usernameInput = document.getElementById('wakeup-username');
  const passwordInput = document.getElementById('wakeup-password');

  if (usernameInput.value === 'user' && passwordInput.value === 'password') {
    loggedInUser = 'user';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('eventsContainer').style.display = 'block';
    document.getElementById('gradients').style.display = 'block';


    loadEvents();
  } else if (usernameInput.value === 'user2' && passwordInput.value === 'password2') {
    loggedInUser = 'user2';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('eventsContainer').style.display = 'block';

    loadEvents();
  } else {
    alert('Invalid username/password');
  }
}

function showNotification(message) {
  // Create a notification container
  const notificationContainer = document.createElement('div');
  notificationContainer.className = 'notification-container';

  // Create a notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  // Create a close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.textContent = 'Stop';

  // Append notification and close button to the container
  notificationContainer.appendChild(notification);
  notificationContainer.appendChild(closeButton);

  // Append the notification container to the body
  document.body.appendChild(notificationContainer);

  // Close the notification when the close button is clicked
  closeButton.addEventListener('click', () => {
    document.body.removeChild(notificationContainer);
  });
}

function applySelectedGradient()
{
  const selectElement = document.getElementById('gradientSelect');
  const selectedGradient = selectElement.value;

  applyGradient(selectedGradient);
}

function applyGradient(gradient) {
  document.body.style.background = gradient;
}
function loadEvents() {
  applySelectedGradient();
  // Configuration data from localStorage
  const storedConfigData = localStorage.getItem('configData');
  configData = storedConfigData ? JSON.parse(storedConfigData) : [];

  const eventsContainer = document.getElementById('eventList');

  const userEvents = configData.filter(event => event.user === loggedInUser);

  userEvents.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1);

  userEvents.forEach(event => {
    const listItem = document.createElement('li');
    const span = document.createElement('span'); 

    span.style.fontFamily = 'Pacifico';
    span.style.color = 'rgb(245, 159, 79)';

    span.textContent = `${event.eventName} at ${event.startTime}, lasting for ${event.duration} hours`;

    listItem.appendChild(span);

    eventsContainer.appendChild(listItem);

    // Check if the event is in the future
    const eventTime = new Date(`${event.eventDate}T${event.startTime}`);
    const currentTime = new Date();

    if (eventTime > currentTime) {
      const timeDifference = eventTime - currentTime;

      // Set a timeout to trigger the notification
      setTimeout(() => {
        // Display the notification on the page
        showNotification(`Alarm: ${event.eventName} - ${event.duration} hours`);
      }, timeDifference);
    }
  });
}


