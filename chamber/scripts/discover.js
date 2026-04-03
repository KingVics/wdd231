import { discoverPlaces } from "../data/discover.mjs";
import { footerDate } from "./footer.js";
import { nav } from "./nav.js";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

function renderPlaces(places) {
  discoverGrid.innerHTML = "";

  places.forEach((place) => {
    const card = document.createElement("article");
    card.className = "discover-card";
    card.innerHTML = `
      <figure>
        <img src="images/discover/${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
      </figure>
      <div class="discover-card-content">
        <h2>${place.name}</h2>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="discover-button" type="button" aria-label="Learn more about ${place.name}">Learn more</button>
      </div>
    `;

    discoverGrid.appendChild(card);
  });
}

function showVisitMessage() {
  const storageKey = "chamberDiscoverLastVisit";
  const now = Date.now();
  const previousVisit = Number(localStorage.getItem(storageKey));

  if (!previousVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const difference = now - previousVisit;

    if (difference < millisecondsPerDay) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const daysBetween = Math.floor(difference / millisecondsPerDay);
      const dayLabel = daysBetween === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysBetween} ${dayLabel} ago.`;
    }
  }

  localStorage.setItem(storageKey, String(now));
}

renderPlaces(discoverPlaces);
showVisitMessage();
footerDate();
nav();
