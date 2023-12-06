"use strict";

document.addEventListener('DOMContentLoaded', function () {
  generateQRCode();

  const loginButton = document.getElementById('login-form-submit');
  loginButton.addEventListener('click', login);

  const showEventButton = document.getElementById('show-event-input-button');
  showEventButton.addEventListener('click', showEventInput);

  const eventList = document.getElementById('event-list');
  eventList.addEventListener('click', handleEventClick);
});

function login() {
  const usernameInput = document.getElementById('calendar-username');
  const passwordInput = document.getElementById('calendar-password');
  const calendarSection = document.getElementById('calendar-section');
  const loginForm = document.getElementById('login-form');
  const mainSection = document.getElementById('main-section');
  const loginErrorMsgHolder = document.getElementById('login-error-msg-holder');

  if (usernameInput.value === 'user' && passwordInput.value === 'password') {
    loginForm.style.display = 'none';  
    mainSection.style.display = 'none';
    calendarSection.style.display = 'block';
    loginErrorMsgHolder.style.display = 'none';
    generateCalendar();
  } else if (usernameInput.value === 'user2' && passwordInput.value === 'password2') {
    loginForm.style.display = 'none'; 
    mainSection.style.display = 'none';
    calendarSection.style.display = 'block';
    loginErrorMsgHolder.style.display = 'none';
    generateCalendar();
  } else {
    toggleError(true);
  }

  function toggleError(showError) {
    const errorMsg = document.getElementById('login-error-msg');
    errorMsg.style.opacity = showError ? 1 : 0;
  }
}

function generateCalendar() {
  const daysInMonth = 31; 
  const startDate = new Date(2023, 11, 1); 
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarContainer = document.getElementById('calendar-container');
  let calendarHTML = '<div class="calendar-month">';
  calendarHTML += `<h2>${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}</h2>`;
  calendarHTML += '</div>';
  calendarHTML += '<table class="calendar-table">';
  calendarHTML += '<tr>';

  for (const day of dayNames) {
    calendarHTML += `<th>${day}</th>`;
  }

  calendarHTML += '</tr>';
  let currentDay = 1;
  const firstDayOfMonth = startDate.getDay();

  for (let week = 0; week < 6; week++) {
    calendarHTML += '<tr>';

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if ((week === 0 && dayOfWeek < firstDayOfMonth) || currentDay > daysInMonth) {
        calendarHTML += '<td></td>';
      } else {
        calendarHTML += `<td>${currentDay}</td>`;
        currentDay++;
      }
    }

    calendarHTML += '</tr>';
  }

  calendarHTML += '</table>';
  calendarContainer.innerHTML = calendarHTML;
}

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('login-form-submit');
  loginButton.addEventListener('click', login);

  const showEventButton = document.getElementById('show-event-input-button');
  showEventButton.addEventListener('click', showEventInput);

  const eventList = document.getElementById('event-list');
  eventList.addEventListener('click', handleEventClick);
});

function showEventInput() {
  const eventSection = document.getElementById('event-section');
  eventSection.style.display = 'block';
}

function addEvent() {
  const eventInput = document.getElementById('event-input');
  const eventList = document.getElementById('event-list');

  const eventText = eventInput.value.trim();
  if (eventText !== '') {
    const eventItem = createEventItem(eventText);
    eventList.appendChild(eventItem);

    // Clear the input field
    eventInput.value = '';
    // Hide the event input section
    const eventSection = document.getElementById('event-section');
    eventSection.style.display = 'none';
  }
}

function createEventItem(eventText) {
  const eventItem = document.createElement('div');
  eventItem.innerHTML = `
    <p>${eventText}
    <button type="button" class="edit-button">Edit</button>
    <button type="button" class="delete-button">Delete</button>
    <button type="button" class="link-button" onclick="generateQRCode()">QR Code</button>
    </p>
    <div class="qr-code-container" style="display:block"></div>
  `;
  return eventItem;
}

function handleEventClick(event) {
  const target = event.target;
  if (target.classList.contains('edit-button')) {
    editEvent(target.previousSibling);
  } else if (target.classList.contains('delete-button')) {
    deleteEvent(target.parentNode);
  } else if(target.classList.contains('link-button')) {
    generateQRCode();
  }
}

function editEvent(eventTextElement) {
  const eventText = prompt('Edit Event:', eventTextElement.textContent.trim());
  if (eventText !== null) {
    // Remove the previous event before updating
    const existingEvent = eventTextElement.parentNode;
    existingEvent.remove();

    // Create a new event item with the updated text
    const eventItem = createEventItem(eventText);

    // Append the new event item
    const eventList = document.getElementById('event-list');
    eventList.appendChild(eventItem);
  }
}

function deleteEvent(eventItem) {
  const qrCodeContainer = eventItem.querySelector('.qr-code-container');

  // Remove the eventItem (including the associated QR code container)
  eventItem.parentNode.removeChild(eventItem);

  // Optional: Clear the QR code container to ensure it's removed from the DOM
  if (qrCodeContainer) {
    qrCodeContainer.innerHTML = '';
  }
}

function generateQRCode() {
  // Get the text for the QR code (you can modify this based on your requirements)
  const eventText = 'Should be config.html if this was hosted somewhere';

  // Check if the user entered some text
  if (eventText !== null && eventText.trim() !== '') {
    // Select the container where you want to display the QR code
    const qrCodeContainer = document.querySelector('.qr-code-container');

    // Clear any existing content in the container
    qrCodeContainer.innerHTML = '';

    // Create a new QRCode instance
    const qr = new QRCode(qrCodeContainer, {
      text: eventText,
      width: 128,
      height: 128,
    });

    // Add an event listener to the QR code container to handle clicks
    qrCodeContainer.addEventListener('click', function() {
      // Redirect to config.html when the QR code is clicked
      window.location.href = 'config.html';
    });
  }
}
