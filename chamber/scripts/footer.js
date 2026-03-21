export function footerDate() {
  document.querySelector('#last-modified').textContent = document.lastModified;
  document.querySelector('#year').textContent = new Date().getFullYear();
}
