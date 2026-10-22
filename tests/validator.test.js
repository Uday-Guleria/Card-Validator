
import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeCardNumber,
  luhnCheck,
  validateCard
} from "../src/validator.js";

import { detectNetwork } from "../src/network.js";

test("normalizes spaces and hyphens", () => {
  assert.equal(
    normalizeCardNumber("7992 7398-713"),
    "79927398713"
  );
});

test("rejects invalid characters", () => {
  assert.equal(normalizeCardNumber("1234abcd5678"), null);
});

test("rejects numbers outside supported length", () => {
  assert.equal(normalizeCardNumber("1234567890"), null);
});

test("accepts a valid Luhn test number", () => {
  assert.equal(luhnCheck("79927398713"), true);
});

test("rejects a number with an incorrect checksum", () => {
  assert.equal(luhnCheck("79927398714"), false);
});

test("validates format and checksum separately", () => {
  const result = validateCard("79927398713");

  assert.equal(result.formatValid, true);
  assert.equal(result.luhnValid, true);
});

test("detects Visa", () => {
  assert.equal(detectNetwork("4111111111111111"), "Visa");
});

test("detects Mastercard", () => {
  assert.equal(detectNetwork("5555555555554444"), "Mastercard");
});

test("detects American Express", () => {
  assert.equal(detectNetwork("378282246310005"), "American Express");
});

test("returns Unknown for an unrecognized prefix", () => {
  assert.equal(detectNetwork("9999999999999995"), "Unknown");
});
