const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const membersContainer = document.querySelector('#members-container');

const MEMBERSHIP_LABELS = {
  1: 'Member',
  2: 'Silver',
  3: 'Gold'
};

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load members data.');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = `<p class="error">Unable to load member data: ${error.message}</p>`;
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder.svg'">
      <h3>${member.name}</h3>
      <p class="description">${member.description}</p>
      <address>
        <span>${member.address}</span><br>
        <a href="tel:${member.phone}">${member.phone}</a>
      </address>
      <a class="website-link" href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      <p class="membership membership--level-${member.membershipLevel}">${MEMBERSHIP_LABELS[member.membershipLevel]} Member</p>
    `;
    membersContainer.appendChild(card);
  });
}

function setView(view) {
  if (view === 'grid') {
    membersContainer.classList.remove('list-view');
    membersContainer.classList.add('grid-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    localStorage.setItem('chamberView', 'grid');
  } else {
    membersContainer.classList.remove('grid-view');
    membersContainer.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    localStorage.setItem('chamberView', 'list');
  }
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

// Restore preferred view
const savedView = localStorage.getItem('chamberView') || 'grid';
setView(savedView);

fetchMembers();

// Footer last modified date
document.querySelector('#last-modified').textContent = document.lastModified;
document.querySelector('#year').textContent = new Date().getFullYear();


// Hamburger nav toggle
const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');
menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

