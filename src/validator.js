
/**
 * Removes permitted separators from a card number.
 * Returns null for invalid characters or unsupported lengths.
 */
export function normalizeCardNumber(input) {
  if (typeof input !== "string") {
    return null;
  }

  const cardNumber = input.replace(/[\s-]/g, "");

  if (!/^\d+$/.test(cardNumber)) {
    return null;
  }

  // Broad supported length range for this demo.
  if (cardNumber.length < 12 || cardNumber.length > 19) {
    return null;
  }

  return cardNumber;
}

/**
 * Checks a digit string using the Luhn algorithm.
 * Expects digits only. Input format is checked separately.
 */
export function luhnCheck(cardNumber) {
  if (
    typeof cardNumber !== "string" ||
    !/^\d+$/.test(cardNumber)
  ) {
    return false;
  }

  let sum = 0;
  let doubleDigit = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cardNumber[i]);

    if (doubleDigit) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
}

/**
 * Combines format validation and Luhn validation.
 */
export function validateCard(input) {
  const cardNumber = normalizeCardNumber(input);

  if (cardNumber === null) {
    return {
      formatValid: false,
      luhnValid: false,
      cardNumber: null,
      message: "Enter a valid numeric input between 12 and 19 digits."
    };
  }

  const luhnValid = luhnCheck(cardNumber);

  return {
    formatValid: true,
    luhnValid,
    cardNumber,
    message: luhnValid
      ? "The number passes the Luhn checksum."
      : "The number fails the Luhn checksum."
  };
}
