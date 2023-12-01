"use strict";

let loggedInUser = null;
let configData = [];


function login() {
  const usernameInput = document.getElementById('config-username');
  const passwordInput = document.getElementById('config-password');
 // const errorMsg = $("#login-error-msg");


  // Mock authentication, replace with actual authentication logic
  if (usernameInput.value === 'user' && passwordInput.value === 'password') {
    loggedInUser = 'user';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('configForm').style.display = 'block';
  } else if (usernameInput.value === 'user2' && passwordInput.value === 'password2') {
    loggedInUser = 'user2';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('configForm').style.display = 'block';
  } else {
    toggleError(true);
  }

  // function toggleError(showError) {
  //   errorMsg.css('opacity', showError ? 1 : 0);
  // }
  
}


function submitConfig() {
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const startTime = document.getElementById('startTime').value;
  const duration = document.getElementById('duration').value;

  configData.push({ user: loggedInUser, eventName, eventDate, startTime, duration });

  alert('Configuration submitted successfully!');
}

function showTable() {
  document.getElementById('dataTable').style.display = 'block';

  const tableHeaders = ['User', 'Event Name', 'Event Date', 'Start Time', 'Duration'];
  const table = document.getElementById('eventTable');

  table.innerHTML = '';

  const headerRow = table.insertRow();
  tableHeaders.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Populate the table with data
  configData.forEach(config => {
    if (config.user === loggedInUser) {
      const row = table.insertRow();
      Object.values(config).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
    }
  });
}

function sortData(key) {
  configData.sort((a, b) => (a[key] > b[key]) ? 1 : -1);

  showTable();
}

function submitConfig() {
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const startTime = document.getElementById('startTime').value;
  const duration = document.getElementById('duration').value;

  const config = { user: loggedInUser, eventName, eventDate, startTime, duration };
  configData.push(config);

  // Save the configuration data to localStorage
  localStorage.setItem('configData', JSON.stringify(configData));

  alert('Configuration submitted successfully!');
}

