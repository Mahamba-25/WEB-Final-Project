// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️ Light Mode';
} else {
  themeToggle.textContent = '🌙 Dark Mode';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️ Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

// TODO Sign Up Form Submission with hashing
// Yeah, tried this sh..., better not

// User Authentication
const users = JSON.parse(localStorage.getItem('users')) || [];

// Sign Up Form Submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (name && email && password) {
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert('User already exists. Please log in.');
    } else {
      // Store user with plain text password
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));  // Save users array to localStorage
      alert('Sign-up successful! You can now log in.');
      document.getElementById('signup-form').reset();
    }
  } else {
    alert('Please fill in all fields.');
  }
});



// Log In Form Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert(`Welcome, ${user.name}!`);

    // Store user data in localStorage for the profile page
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to profile page
    window.location.href = 'profile.html';
  } else {
    alert('Invalid email or password.');
  }
});


// Game Search Functionality
let debounceTimeout;
document.getElementById('game-search').addEventListener('input', (e) => {
  clearTimeout(debounceTimeout);  // Clear the previous timeout

  debounceTimeout = setTimeout(() => {
    const query = e.target.value.toLowerCase();
    const games = document.querySelectorAll('.game');
    games.forEach(game => {
      const title = game.querySelector('h3').textContent.toLowerCase();
      const genre = game.getAttribute('data-genre').toLowerCase();
      if (title.includes(query) || genre.includes(query)) {
        game.style.display = 'block';
      } else {
        game.style.display = 'none';
      }
    });
  }, 300);  // Delay the search by 300 milliseconds, for improvement purposes
});

// Contact Form Submission with Actual MockAPI
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (name && email && message) {
    fetch('https://673b8119339a4ce4451c71a7.mockapi.io/api/mahamba/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('API Response:', data);
          alert('Thank you for reaching out! We will get back to you soon.');
          document.getElementById('contact-form').reset();
        })
        .catch(error => {
          console.error('API Error:', error);
          alert('An error occurred. Please try again later.');
        });
  } else {
    alert('Please fill in all fields.');
  }
});
