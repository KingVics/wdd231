export function nav() {
  const menuBtn = document.querySelector('#menu-btn');
  const navMenu = document.querySelector('#nav-menu');
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}
