let loggedInUser = null;
let configData = [];

function login() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  // Mock authentication, replace with actual authentication logic
  if (usernameInput.value === 'user' && passwordInput.value === 'password') {
    loggedInUser = 'user';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('eventsContainer').style.display = 'block';

    loadEvents();
  } else if (usernameInput.value === 'user2' && passwordInput.value === 'password2') {
    loggedInUser = 'user2';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('eventsContainer').style.display = 'block';

    loadEvents();
  } else {
    alert('Invalid username/password');
  }
}

function loadEvents() {
  // Fetch the configuration data from localStorage
  const storedConfigData = localStorage.getItem('configData');
  configData = storedConfigData ? JSON.parse(storedConfigData) : [];

  const eventsContainer = document.getElementById('eventList');

  const userEvents = configData.filter(event => event.user === loggedInUser);

  userEvents.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1);

  userEvents.forEach(event => {
    const listItem = document.createElement('li');
    listItem.textContent = `${event.eventName} at ${event.startTime}, lasting for ${event.duration} hours`;
    eventsContainer.appendChild(listItem);
  });
}
