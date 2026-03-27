import { footerDate } from "./footer.js";
import { nav } from "./nav.js";

const summary = document.querySelector("#submission-summary");
const params = new URLSearchParams(window.location.search);

const fields = [
  { label: "First Name", value: params.get("firstName") },
  { label: "Last Name", value: params.get("lastName") },
  { label: "Email Address", value: params.get("email") },
  { label: "Mobile Phone Number", value: params.get("phone") },
  { label: "Business Name", value: params.get("organizationName") },
  { label: "Submitted On", value: formatTimestamp(params.get("timestamp")) }
];

function formatTimestamp(value) {
  if (!value) {
    return "Not provided";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("en-NG", {
    dateStyle: "full",
    timeStyle: "short"
  });
}

function displaySummary() {
  summary.innerHTML = "";

  fields.forEach(({ label, value }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "summary-item";
    wrapper.innerHTML = `
      <dt>${label}</dt>
      <dd>${value || "Not provided"}</dd>
    `;
    summary.appendChild(wrapper);
  });
}

displaySummary();
footerDate();
nav();
