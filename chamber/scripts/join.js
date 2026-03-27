import { footerDate } from "./footer.js";
import { nav } from "./nav.js";

const timestampField = document.querySelector("#timestamp");
const modalTriggers = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll("[data-close]");
const modals = document.querySelectorAll(".membership-modal");

function setTimestamp() {
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
}

function setupModals() {
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      modal?.showModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog")?.close();
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      const bounds = modal.getBoundingClientRect();
      const clickedInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!clickedInside) {
        modal.close();
      }
    });
  });
}

setTimestamp();
setupModals();
footerDate();
nav();
