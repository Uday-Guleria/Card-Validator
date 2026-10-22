
export function detectNetwork(cardNumber) {
  if (typeof cardNumber !== "string" || !/^\d+$/.test(cardNumber)) {
    return "Unknown";
  }

  const length = cardNumber.length;

  // Visa: commonly 13, 16 or 19 digits.
  if (
    cardNumber.startsWith("4") &&
    [13, 16, 19].includes(length)
  ) {
    return "Visa";
  }

  // Mastercard: 51-55 or 2221-2720, typically 16 digits.
  if (
    length === 16 &&
    (
      /^5[1-5]/.test(cardNumber) ||
      (
        Number(cardNumber.slice(0, 4)) >= 2221 &&
        Number(cardNumber.slice(0, 4)) <= 2720
      )
    )
  ) {
    return "Mastercard";
  }

  // American Express: 34 or 37, typically 15 digits.
  if (
    length === 15 &&
    /^3[47]/.test(cardNumber)
  ) {
    return "American Express";
  }

  // Common Discover patterns. Not exhaustive.
  if (
    [16, 17, 18, 19].includes(length) &&
    (
      /^6011/.test(cardNumber) ||
      /^65/.test(cardNumber) ||
      (
        Number(cardNumber.slice(0, 3)) >= 644 &&
        Number(cardNumber.slice(0, 3)) <= 649
      ) ||
      (
        Number(cardNumber.slice(0, 6)) >= 622126 &&
        Number(cardNumber.slice(0, 6)) <= 622925
      )
    )
  ) {
    return "Discover";
  }

  return "Unknown";
}
