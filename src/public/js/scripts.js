// eslint-disable-next-line import/extensions
import { BASE_URL } from '../configs/urls.js';

let usersRendered = false; // To keep track of whether users are rendered
let currentPage = 1; // To keep track of the current page of users
let token = ''; // Variable to store token

function fetchTokenAndSubmitForm(formData) {
  // Fetch token
  fetch(`${BASE_URL}/api/v1/token`)
    .then((response) => response.json())
    .then((data) => {
      token = data.token;
      // After receiving token, proceed with form submission including token in headers
      fetch(`${BASE_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
          Token: token,
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert('User created successfully!');
            document.getElementById('createUserFormBlock').style.display = 'none';
          } else {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || 'Failed to create user. Please try again.');
            });
          }
        })
        .catch((error) => {
          console.error('Error creating user:', error.message);
          alert(error.message);
        });
    })
    .catch((error) => console.error('Error fetching token:', error));
}

function renderUsers(users) {
  const usersContainer = document.getElementById('usersContainer');

  if (currentPage === 1) {
    usersContainer.innerHTML = ''; // Clear the container if it's the first page
  }

  users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    const userPhoto = document.createElement('img');
    userPhoto.src = user.photo ? `${BASE_URL}${user.photo}` : `https://ui-avatars.com/api/?name=${user.name[0]}+${user.name[1]}&background=random&size=128`;
    userPhoto.alt = `${user.name}'s Photo`;
    userPhoto.classList.add('user-photo');

    const userDetails = document.createElement('div');
    userDetails.classList.add('user-details');

    const userId = document.createElement('p');
    userId.textContent = `ID: ${user.id}`;

    const userName = document.createElement('p');
    userName.textContent = `Name: ${user.name}`;

    const userEmail = document.createElement('p');
    userEmail.textContent = `Email: ${user.email}`;

    const userPhone = document.createElement('p');
    userPhone.textContent = `Phone: ${user.phone}`;

    const userPosition = document.createElement('p');
    userPosition.textContent = `Position ID: ${user.position_id}`;

    userDetails.appendChild(userId);
    userDetails.appendChild(userName);
    userDetails.appendChild(userEmail);
    userDetails.appendChild(userPhone);
    userDetails.appendChild(userPosition);

    userDiv.appendChild(userPhoto);
    userDiv.appendChild(userDetails);

    usersContainer.appendChild(userDiv);
  });

  // Show the "Show More" button if there are more users to load
  if (users.length > 0) {
    document.getElementById('showMoreBtn').style.display = 'block';
  } else {
    document.getElementById('showMoreBtn').style.display = 'none';
  }
}

function fetchAndExecute(url, options) {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (url.includes('/api/v1/users')) {
        renderUsers(data.users, currentPage);
        usersRendered = true;
      }
    })
    .then(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    })
    .catch((error) => console.error(`Error fetching data from ${url}:`, error));
}

// Form submission event listener
document.getElementById('userForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetchTokenAndSubmitForm(formData);
});

// Event listener for the "Get Users" button
document.getElementById('fetchUsersData').addEventListener('click', () => {
  currentPage = 1; // Reset current page when fetching new users
  document.getElementById('usersBlock').style.display = 'flex';
  document.getElementById('createUserFormBlock').style.display = 'none';
  fetchAndExecute(`${BASE_URL}/api/v1/users?count=6&page=1`, { method: 'GET' });
});

// Event listener for the "Show More" button
document.getElementById('showMoreBtn').addEventListener('click', () => {
  currentPage++; // Increment current page to load the next page of users
  fetchAndExecute(`${BASE_URL}/api/v1/users?count=6&page=${currentPage}`, { method: 'GET' });
});

// Event listener for the "Create New User" button
document.getElementById('createUserBtn').addEventListener('click', () => {
  // Show the create user form
  document.getElementById('usersBlock').style.display = 'none';
  document.getElementById('createUserFormBlock').style.display = 'block';
});
