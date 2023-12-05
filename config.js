"use strict";

let loggedInUser = localStorage.getItem('loggedInUser');


let configData = JSON.parse(localStorage.getItem('configData')) || [];







function login() {
  const usernameInput = document.getElementById('config-username');
  const passwordInput = document.getElementById('config-password');

  
  if (usernameInput.value === 'user' && passwordInput.value === 'password') {
    loggedInUser = 'user';
    localStorage.setItem('loggedInUser', loggedInUser);
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('configForm').style.display = 'block';

    
    updateNavigationBar(true, loggedInUser);
  } else if (usernameInput.value === 'user2' && passwordInput.value === 'password2') {
    loggedInUser = 'user2';
    localStorage.setItem('loggedInUser', loggedInUser);
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('configForm').style.display = 'block';

    
    updateNavigationBar(true, loggedInUser);
  } else {
    toggleError(true);
  }

  function toggleError(showError) {
    const errorMsg = document.getElementById('login-error-msg');
    errorMsg.style.opacity = showError ? 1 : 0;
  }
}




function showTable() {
  document.getElementById('dataTable').style.display = 'block';

  const tableHeaders = ['User', 'Event Name', 'Event Date', 'Start Time', 'Duration', 'Actions'];
  const table = document.getElementById('eventTable');

  table.innerHTML = '';

  const headerRow = table.insertRow();
  tableHeaders.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  configData.forEach(config => {
    if (config.user === loggedInUser) {
      const row = table.insertRow();

      // Add cells for each property in the config
      Object.values(config).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
      });

      // Add a delete button
      const deleteCell = row.insertCell();
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.id = 'delete-button';
      deleteButton.addEventListener('click', function(event) {
        // Prevent the default behavior of the click event
        event.stopPropagation();
        deleteConfig(config);
      });
      deleteCell.appendChild(deleteButton);

      // Add a click event listener for the entire row
      row.addEventListener('click', function() {
        window.location.href = 'wakeup.html';
      });
    }
  });
}


function deleteConfig(configToDelete) {
  configData = configData.filter(config => config !== configToDelete);
  // Save the updated configuration data to localStorage
  localStorage.setItem('configData', JSON.stringify(configData));

  // Refresh the table
  showTable();
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

  const submitMessage = document.getElementById('success-message');
  submitMessage.textContent = 'Submission successful';
  submitMessage.style.display = 'block';
  submitMessage.style.fontFamily = 'Pacifico';
  submitMessage.style.color = 'rgb(245, 159, 79)';

  setTimeout(() => {
    submitMessage.style.display = 'none';
  }, 3000);

  //alert('Configuration submitted successfully!');
}

