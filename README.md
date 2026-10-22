# Card Validator

A frontend application that validates card-number checksums using the Luhn algorithm and identifies common card networks based on prefix and length patterns.

## Features

- Luhn checksum validation
- Input format and length validation
- Basic Visa, Mastercard, American Express, and Discover detection
- Responsive user interface
- Automated tests using Node.js's built-in test runner

## Tech Stack

- HTML
- CSS
- JavaScript ES modules
- Node.js for running tests and serving the application

## Getting Started

1. Install Node.js.
2. Clone this repository.
3. Open a terminal in the project directory.
4. Start the local server:

   ```bash
   npx serve .
   ```

5. Open the local URL printed in the terminal.

## Run Tests

```bash
npm test
```

## Limitations

This project checks formatting, checksum validity, and basic network patterns. It does not verify whether a card is genuine, active, or authorized for payments.

Use synthetic test numbers only. Do not enter or store real payment card details.

## License

MIT