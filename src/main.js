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

// User Authentication
const users = [];

// Sign Up Form Submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (name && email && password) {
    // Simple validation to check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert('User already exists. Please log in.');
    } else {
      users.push({ name, email, password });
      alert('Sign-up successful! You can now log in.');
      document.getElementById('signup-form').reset();
    }
  } else {
    alert('Please fill in all fields.');
  }
});


// // Sign Up Form Submission with hashing
// document.getElementById('signup-form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   const name = document.getElementById('signup-name').value.trim();
//   const email = document.getElementById('signup-email').value.trim();
//   const password = document.getElementById('signup-password').value.trim();
//
//   if (name && email && password) {
//     // Simple hashing (Base64 encoding for this example)
//     const hashedPassword = btoa(password);  // In production, use a secure hashing algorithm like bcrypt
//
//     // Store hashed password
//     users.push({ name, email, password: hashedPassword });
//     alert('Sign-up successful!');
//   } else {
//     alert('Please fill in all fields.');
//   }
// });


// Log In Form Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert(`Welcome back, ${user.name}!`);
    // Redirect to profile page or display user details
    // For simplicity, we'll just reset the form
    document.getElementById('login-form').reset();
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
  }, 300);  // Delay the search by 300 milliseconds
});


// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (name && email && message) {
    // Store the message in localStorage or send it to a server
    // For simplicity, we'll just display an alert
    alert('Thank you for reaching out! We will get back to you soon.');
    document.getElementById('contact-form').reset();
  } else {
    alert('Please fill in all fields.');
  }
});
