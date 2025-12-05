/* eslint-disable sonarjs/no-hardcoded-passwords */
import { expect, test } from "vitest";

import { decrypt, encrypt } from "../src/index.js";

const input = "test/example.pdf";

test("Should encrypt a file with a space", async () => {
  await expect(
    encrypt({
      input: "test/example copy.pdf",
      output: "test/output/file to file.pdf",
      password: "1234",
    }),
  ).resolves.toBeTruthy();
});

test("Should decrypt a file with a space", async () => {
  await expect(
    decrypt({
      input: "test/output/file to file.pdf",
      password: "1234",
    }),
  ).resolves.toBeTruthy();
});

test("Should encrypt a File without a password", async () => {
  await expect(
    encrypt({
      input,
      output: "test/output/file-to-file-no-pw.pdf",
    }),
  ).resolves.toBeTruthy();
});

test("Should decrypt a File without a password", async () => {
  await expect(
    decrypt({
      input: "test/output/file-to-file-no-pw.pdf",
      output: "test/output/file-to-file-no-pw-decrypted.pdf",
    }),
  ).resolves.toBeTruthy();
});

test("Should encrypt to a file", async () => {
  await expect(
    encrypt({
      input,
      output: "test/output/encrypted.pdf",
      password: "1234",
    }),
  ).resolves.toBeTruthy();
});

test("Should decrypt from a file", async () => {
  await expect(
    decrypt({
      input: "test/output/encrypted.pdf",
      output: "test/output/decrypted.pdf",
      password: "1234",
    }),
  ).resolves.toBeTruthy();
});

test("Should encrypt File -> Buffer", async () => {
  const BufferFromFile = await encrypt({
    input,
    password: "1234",
  });
  expect(Buffer.isBuffer(BufferFromFile)).toBe(true);
});

test("Should decrypt a File -> Buffer", async () => {
  const BufferFromFile = await decrypt({
    input: "test/output/encrypted.pdf",
    password: "1234",
  });
  expect(Buffer.isBuffer(BufferFromFile)).toBe(true);
});

// Not sure this can happen: https://github.com/qpdf/qpdf/issues/54
test.todo("Should encrypt a Buffer -> File");
test.todo("Should decrypt a Buffer -> File");
test.todo("Should encrypt a Buffer -> Buffer");
test.todo("Should decrypt a Buffer -> Buffer");
