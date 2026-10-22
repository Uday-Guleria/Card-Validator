
import { validateCard } from "./validator.js";
import { detectNetwork } from "./network.js";

const form = document.querySelector("#validator-form");
const input = document.querySelector("#card-number");
const result = document.querySelector("#result");

const resultIcon = document.querySelector("#result-icon");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");

const networkValue = document.querySelector("#network-value");
const formatValue = document.querySelector("#format-value");
const luhnValue = document.querySelector("#luhn-value");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const validation = validateCard(input.value);

  result.classList.remove("hidden", "success", "failure");

  if (!validation.formatValid) {
    result.classList.add("failure");

    resultIcon.textContent = "!";
    resultTitle.textContent = "Invalid input";
    resultMessage.textContent = validation.message;

    networkValue.textContent = "Not identified";
    formatValue.textContent = "Invalid";
    luhnValue.textContent = "Not checked";

    return;
  }

  const network = detectNetwork(validation.cardNumber);

  networkValue.textContent = network;
  formatValue.textContent = "Valid format";
  luhnValue.textContent = validation.luhnValid
    ? "Passed"
    : "Failed";

  if (validation.luhnValid) {
    result.classList.add("success");

    resultIcon.textContent = "✓";
    resultTitle.textContent = "Checksum passed";
  } else {
    result.classList.add("failure");

    resultIcon.textContent = "✕";
    resultTitle.textContent = "Checksum failed";
  }

  resultMessage.textContent = validation.message;
});

// Clear old results when the user starts editing.
input.addEventListener("input", () => {
  result.classList.add("hidden");
  result.classList.remove("success", "failure");
});
