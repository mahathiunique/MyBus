// ========================================
// MyBus - Main Application
// ========================================

// Sample bus data
const busData = [
  {
    id: 1,
    name: "Volvo Multi-Axle AC Sleeper",
    operator: "VRL Travels",
    type: "Sleeper",
    rating: 4.5,
    departure: "20:00",
    arrival: "10:00",
    duration: "14h",
    from: "Mumbai",
    to: "Bangalore",
    price: 1200,
    seats: 12,
    amenities: ["AC", "WiFi", "Charging Point", "Water Bottle"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop",
    about: "Experience comfortable and safe travel with VRL Travels. Our Volvo Multi-Axle AC Sleeper offers a premium travel experience with top-notch amenities including AC, WiFi, Charging Point, Water Bottle. The bus features comfortable sleeper seats designed for long-distance travel. We prioritize passenger safety and comfort, ensuring you reach your destination relaxed and refreshed.",
    boardingPoints: [
      { name: "Mumbai Central Station", time: "20:00 PM" },
      { name: "Dadar TT Circle", time: "20:30 PM" },
      { name: "Sion", time: "21:00 PM" }
    ]
  },
  {
    id: 2,
    name: "Mercedes Benz Multi-Axle",
    operator: "Orange Tours",
    type: "Semi-Sleeper",
    rating: 4.3,
    departure: "21:30",
    arrival: "11:30",
    duration: "14h",
    from: "Mumbai",
    to: "Bangalore",
    price: 1400,
    seats: 8,
    amenities: ["AC", "WiFi", "Blanket", "Snacks"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=250&fit=crop",
    about: "Travel in luxury with Orange Tours. Our Mercedes Benz Multi-Axle buses are equipped with the finest amenities to make your journey memorable. Enjoy complimentary snacks, blankets, and high-speed WiFi throughout your trip.",
    boardingPoints: [
      { name: "Borivali Station", time: "21:30 PM" },
      { name: "Thane", time: "22:15 PM" }
    ]
  },
  {
    id: 3,
    name: "Scania AC Seater",
    operator: "KPN Travels",
    type: "Seater",
    rating: 4.7,
    departure: "22:00",
    arrival: "08:00",
    duration: "10h",
    from: "Mumbai",
    to: "Bangalore",
    price: 950,
    seats: 22,
    amenities: ["AC", "Charging Point", "Reading Light"],
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=400&h=250&fit=crop",
    about: "KPN Travels offers reliable and affordable travel options. Our Scania AC Seaters provide a comfortable journey with essential amenities. Perfect for budget-conscious travelers who don't want to compromise on comfort.",
    boardingPoints: [
      { name: "Andheri East", time: "22:00 PM" },
      { name: "Vashi", time: "22:45 PM" },
      { name: "Panvel", time: "23:30 PM" }
    ]
  }
];

// Special offers data
const offersData = [
  { code: "FIRST50", discount: "50% OFF", description: "Get 50% off on your first booking" },
  { code: "WEEKEND20", discount: "20% OFF", description: "Weekend special - 20% off on all routes" },
  { code: "FAMILY100", discount: "₹100 OFF", description: "Book 4 or more seats and get ₹100 off" }
];

// App State
const state = {
  currentPage: 'login',
  user: null,
  searchQuery: {
    from: 'Mumbai',
    to: 'Bangalore',
    date: new Date().toISOString().split('T')[0]
  },
  selectedBus: null
};

// Check for existing session
function checkSession() {
  const user = localStorage.getItem('mybus_user');
  if (user) {
    state.user = JSON.parse(user);
    state.currentPage = 'home';
  }
}

// Router
function navigate(page, data = null) {
  state.currentPage = page;
  if (data) {
    if (page === 'bus-details') {
      state.selectedBus = data;
    }
  }
  render();
}

// Render the app
function render() {
  const app = document.getElementById('app');

  switch (state.currentPage) {
    case 'login':
      app.innerHTML = renderLogin();
      break;
    case 'signup':
      app.innerHTML = renderSignup();
      break;
    case 'home':
      app.innerHTML = renderHome();
      break;
    case 'bus-details':
      app.innerHTML = renderBusDetails();
      break;
    default:
      app.innerHTML = renderLogin();
  }

  attachEventListeners();
}

// ========================================
// Page Templates
// ========================================

function renderLogin() {
  return `
    <div class="auth-container">
      <div class="auth-left">
        <div class="auth-card">
          <div class="auth-logo">
            <div class="bus-icon">
              <i class="fas fa-bus"></i>
            </div>
            <h1>MyBus</h1>
          </div>
          <h2 class="auth-title">Welcome Back</h2>
          <form id="loginForm">
            <div class="form-group">
              <label>Email</label>
              <div class="input-wrapper">
                <i class="fas fa-envelope icon"></i>
                <input type="email" id="loginEmail" placeholder="Enter your email" required>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock icon"></i>
                <input type="password" id="loginPassword" placeholder="Enter your password" required>
              </div>
            </div>
            <button type="submit" class="btn-primary">Login</button>
          </form>
          <p class="auth-footer">
            Don't have an account? <a href="#" id="goToSignup">Sign up</a>
          </p>
          <p class="auth-demo">
            Demo: Use any registered account or create a new one
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderSignup() {
  return `
    <div class="auth-container">
      <div class="auth-left">
        <div class="auth-card">
          <div class="auth-logo">
            <div class="bus-icon">
              <i class="fas fa-bus"></i>
            </div>
            <h1>MyBus</h1>
          </div>
          <h2 class="auth-title">Create Account</h2>
          <form id="signupForm">
            <div class="form-group">
              <label>Full Name</label>
              <div class="input-wrapper">
                <i class="fas fa-user icon"></i>
                <input type="text" id="signupName" placeholder="Enter your name" required>
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <div class="input-wrapper">
                <i class="fas fa-envelope icon"></i>
                <input type="email" id="signupEmail" placeholder="Enter your email" required>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock icon"></i>
                <input type="password" id="signupPassword" placeholder="Enter your password" required>
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock icon"></i>
                <input type="password" id="signupConfirmPassword" placeholder="Confirm your password" required>
              </div>
            </div>
            <button type="submit" class="btn-primary">Sign Up</button>
          </form>
          <p class="auth-footer">
            Already have an account? <a href="#" id="goToLogin">Login</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  const userName = state.user?.name || 'User';

  return `
    <header class="header">
      <div class="header-logo">
        <i class="fas fa-bus bus-icon"></i>
        <h1>MyBus</h1>
      </div>
      <div class="header-user">
        <span class="welcome">Welcome, ${userName}!</span>
        <button class="btn-logout" id="logoutBtn">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </header>
    
    <section class="search-section">
      <div class="search-bar">
        <div class="search-field">
          <label>From</label>
          <div class="field-content">
            <i class="fas fa-map-marker-alt icon"></i>
            <input type="text" id="searchFrom" value="${state.searchQuery.from}" placeholder="Enter city">
          </div>
        </div>
        <div class="search-field">
          <label>To</label>
          <div class="field-content">
            <i class="fas fa-map-marker-alt icon"></i>
            <input type="text" id="searchTo" value="${state.searchQuery.to}" placeholder="Enter city">
          </div>
        </div>
        <div class="search-field">
          <label>Date</label>
          <div class="field-content">
            <i class="fas fa-calendar icon"></i>
            <input type="date" id="searchDate" value="${state.searchQuery.date}">
          </div>
        </div>
        <button class="btn-search" id="searchBtn">
          <i class="fas fa-search"></i>
          Search Buses
        </button>
      </div>
    </section>
    
    <main class="main-content">
      <section class="offers-section">
        <h2 class="section-title">
          <i class="fas fa-tag icon"></i>
          Special Offers
        </h2>
        <div class="offers-grid">
          ${offersData.map(offer => `
            <div class="offer-card">
              <div class="offer-header">
                <span class="offer-code">${offer.code}</span>
                <span class="offer-badge">${offer.discount}</span>
              </div>
              <p class="offer-desc">${offer.description}</p>
            </div>
          `).join('')}
        </div>
      </section>
      
      <section class="buses-section">
        <h2 class="section-title">Available Buses</h2>
        ${busData.map(bus => renderBusCard(bus)).join('')}
      </section>
    </main>
  `;
}

function renderBusCard(bus) {
  return `
    <div class="bus-card" data-bus-id="${bus.id}">
      <div class="bus-image">
        <img src="${bus.image}" alt="${bus.name}">
      </div>
      <div class="bus-info">
        <div class="bus-header">
          <div>
            <h3 class="bus-name">${bus.name}</h3>
            <p class="bus-operator">${bus.operator}</p>
          </div>
          <div class="bus-rating">
            <i class="fas fa-star icon"></i>
            ${bus.rating}
          </div>
        </div>
        <div class="bus-schedule">
          <div class="schedule-item">
            <p class="schedule-label">Departure</p>
            <p class="schedule-value">${bus.departure}</p>
          </div>
          <div class="schedule-item">
            <p class="schedule-label">Arrival</p>
            <p class="schedule-value">${bus.arrival}</p>
          </div>
          <div class="schedule-item">
            <p class="schedule-label">Duration</p>
            <p class="schedule-value">${bus.duration}</p>
          </div>
        </div>
        <div class="bus-amenities">
          ${bus.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
        </div>
        <div class="bus-footer">
          <div class="seats-available">
            <i class="fas fa-users icon"></i>
            ${bus.seats} seats available
          </div>
          <div class="bus-price">
            <p class="price-label">Starting from</p>
            <p class="price-value">₹${bus.price}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBusDetails() {
  const bus = state.selectedBus || busData[0];

  return `
    <header class="details-header">
      <a href="#" class="back-link" id="backToSearch">
        <i class="fas fa-arrow-left"></i>
        Back to Search
      </a>
    </header>
    
    <div class="details-hero">
      <img src="${bus.image}" alt="${bus.name}">
      <div class="details-rating">
        <i class="fas fa-star"></i>
        ${bus.rating}
      </div>
    </div>
    
    <div class="details-content">
      <div class="details-title-section">
        <div>
          <h1 class="details-bus-name">${bus.name}</h1>
          <p class="details-operator">${bus.operator}</p>
          <span class="type-badge">${bus.type}</span>
        </div>
        <div class="details-price">
          <p class="price-label">Starting from</p>
          <p class="price-value">₹${bus.price}</p>
          <p class="price-per">per seat</p>
        </div>
      </div>
      
      <div class="route-section">
        <h3 class="route-title">Route Details</h3>
        <div class="route-grid">
          <div class="route-item">
            <div class="icon from">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="info">
              <label>From</label>
              <p class="value">${bus.from}</p>
              <p class="sub">Departure: ${bus.departure}</p>
            </div>
          </div>
          <div class="route-item">
            <div class="icon duration">
              <i class="fas fa-clock"></i>
            </div>
            <div class="info">
              <label>Duration</label>
              <p class="value">${bus.duration}</p>
              <p class="sub">Direct journey</p>
            </div>
          </div>
          <div class="route-item">
            <div class="icon to">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="info">
              <label>To</label>
              <p class="value">${bus.to}</p>
              <p class="sub">Arrival: ${bus.arrival}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="amenities-section">
        <h3 class="amenities-title">Amenities</h3>
        <div class="amenities-grid">
          ${bus.amenities.map(amenity => `
            <div class="amenity-item">
              <i class="fas ${getAmenityIcon(amenity)} icon"></i>
              <span>${amenity}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="seats-alert">
        <i class="fas fa-chair"></i>
        Only ${bus.seats} seats remaining! Book now to secure your spot.
      </div>
      
      <div class="about-section">
        <h3 class="about-title">About this Bus</h3>
        <p class="about-text">${bus.about}</p>
      </div>
      
      <div class="boarding-section">
        <h3 class="boarding-title">Boarding Points</h3>
        <ul class="boarding-list">
          ${bus.boardingPoints.map(point => `
            <li class="boarding-item">
              <span class="boarding-dot"></span>
              <div class="boarding-info">
                <p class="name">${point.name}</p>
                <p class="time">${point.time}</p>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

function getAmenityIcon(amenity) {
  const icons = {
    'AC': 'fa-snowflake',
    'WiFi': 'fa-wifi',
    'Charging Point': 'fa-plug',
    'Water Bottle': 'fa-bottle-water',
    'Blanket': 'fa-bed',
    'Snacks': 'fa-cookie',
    'Reading Light': 'fa-lightbulb'
  };
  return icons[amenity] || 'fa-check';
}

// ========================================
// Event Listeners
// ========================================

function attachEventListeners() {
  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Signup form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Navigation links
  const goToSignup = document.getElementById('goToSignup');
  if (goToSignup) {
    goToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('signup');
    });
  }

  const goToLogin = document.getElementById('goToLogin');
  if (goToLogin) {
    goToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('login');
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Search button
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }

  // Bus cards
  const busCards = document.querySelectorAll('.bus-card');
  busCards.forEach(card => {
    card.addEventListener('click', () => {
      const busId = parseInt(card.dataset.busId);
      const bus = busData.find(b => b.id === busId);
      if (bus) {
        navigate('bus-details', bus);
      }
    });
  });

  // Back to search
  const backToSearch = document.getElementById('backToSearch');
  if (backToSearch) {
    backToSearch.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('home');
    });
  }
}

// ========================================
// Handlers
// ========================================

const API_URL = 'http://localhost:5001/api';

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      state.user = { name: data.user.name, email: data.user.email };
      localStorage.setItem('mybus_user', JSON.stringify(state.user));
      navigate('home');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Unable to connect to server. Please try again.');
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (data.success) {
      state.user = { name: data.user.name, email: data.user.email };
      localStorage.setItem('mybus_user', JSON.stringify(state.user));
      alert('Account created successfully!');
      navigate('home');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Unable to connect to server. Please try again.');
  }
}

function handleLogout() {
  state.user = null;
  localStorage.removeItem('mybus_user');
  navigate('login');
}

function handleSearch() {
  const from = document.getElementById('searchFrom').value;
  const to = document.getElementById('searchTo').value;
  const date = document.getElementById('searchDate').value;

  state.searchQuery = { from, to, date };

  // For demo, just show alert
  alert(`Searching buses from ${from} to ${to} on ${date}`);
}

// ========================================
// Initialize App
// ========================================

checkSession();
render();
