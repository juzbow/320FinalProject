"use strict";

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('login-form-submit');
  loginButton.addEventListener('click', login);
});

function login() {
  const usernameInput = document.getElementById('calendar-username');
  const passwordInput = document.getElementById('calendar-password');
  const calendarSection = document.getElementById('calendar-section');
  const loginForm = document.getElementById('login-form');
  const loginErrorMsgHolder = document.getElementById('login-error-msg-holder');

  if (usernameInput.value === 'user' && passwordInput.value === 'password') {
 
    loginForm.style.display = 'none';  
    calendarSection.style.display = 'block';
    loginErrorMsgHolder.style.display = 'none';
    generateCalendar();
  } else if (usernameInput.value === 'user2' && passwordInput.value === 'password2') {
    
    loginForm.style.display = 'none'; 
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




