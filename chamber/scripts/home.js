import { footerDate } from "./footer.js";
import { nav } from "./nav.js";

// ---- Configuration ----
const WEATHER_API_KEY = '4736647188dd520a432bd4afebabdbec';
const WEATHER_CITY = 'Lagos';
const WEATHER_COUNTRY = 'NG';

const MEMBERSHIP_LABELS = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

// ---- Weather ----
async function fetchWeather() {
  const currentEl = document.querySelector('#weather-current');
  const forecastEl = document.querySelector('#weather-forecast');

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY},${WEATHER_COUNTRY}&appid=${WEATHER_API_KEY}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CITY},${WEATHER_COUNTRY}&appid=${WEATHER_API_KEY}&units=metric&cnt=24`)
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather request failed.');

    const [current, forecast] = await Promise.all([currentRes.json(), forecastRes.json()]);

    displayCurrentWeather(current, currentEl);
    displayForecast(forecast, forecastEl);
  } catch {
    currentEl.innerHTML = '<p class="error">Weather data unavailable.</p>';
  }
}

function displayCurrentWeather(data, el) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  el.innerHTML = `
    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon" width="72" height="72">
    <p class="weather-temp">${Math.round(data.main.temp)}&deg;C</p>
    <p class="weather-desc">${data.weather[0].description}</p>
    <p class="weather-humidity">Humidity: ${data.main.humidity}%</p>
  `;
}

function displayForecast(data, el) {
  const seen = new Set();
  const days = [];
  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const label = date.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!seen.has(label)) {
      seen.add(label);
      days.push({ label, item });
      if (days.length === 3) break;
    }
  }

  el.innerHTML = '';
  days.forEach(({ label, item }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    const div = document.createElement('div');
    div.className = 'forecast-day';
    div.innerHTML = `
      <p class="day-label">${label}</p>
      <img src="${iconUrl}" alt="${item.weather[0].description}" width="40" height="40">
      <p class="day-temp">${Math.round(item.main.temp)}&deg;C</p>
    `;
    el.appendChild(div);
  });
}

// ---- Spotlights ----
async function fetchSpotlights() {
  const container = document.querySelector('#spotlights-container');
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load members data.');
    const members = await response.json();

    const eligible = members.filter(m => m.membershipLevel >= 2);
    eligible.sort(() => Math.random() - 0.5);
    const picks = eligible.slice(0, Math.min(3, eligible.length));

    displaySpotlights(picks, container);
  } catch {
    container.innerHTML = '<p class="error">Unable to load spotlights.</p>';
  }
}

function displaySpotlights(members, container) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'spotlight-card';
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy"
           onerror="this.src='images/placeholder.svg'" width="80" height="80">
      <div class="spotlight-info">
        <p class="membership membership--level-${member.membershipLevel}">${MEMBERSHIP_LABELS[member.membershipLevel]} Member</p>
        <h3>${member.name}</h3>
        <address>
          <span>${member.address}</span><br>
          <a href="tel:${member.phone}">${member.phone}</a>
        </address>
        <a href="${member.website}" class="website-link" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    `;
    container.appendChild(card);
  });
}


// ---- Footer ----
footerDate()

// ---- Nav hamburger ----
nav()

// ---- Init ----
fetchWeather();
fetchSpotlights();
