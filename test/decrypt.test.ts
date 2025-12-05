/* eslint-disable sonarjs/no-hardcoded-passwords */
import { expect, test } from "vitest";

import { decrypt } from "../src/decrypt.js";

test("Should not work if no input file is specified", async () => {
  // @ts-expect-error This is what I'm testing
  await expect(decrypt({ password: "1234" })).rejects.toThrow(
    "Please specify input file",
  );
});

test("Should not work if the input file doesn't exist", async () => {
  await expect(decrypt({ input: "bad_file_name.pdf" })).rejects.toThrow(
    "Input file doesn't exist",
  );
});

test("Should decrypt the file with a password", async () => {
  await expect(
    decrypt({
      input: "test/encrypted.pdf",
      output: "test/output/decrypted.pdf",
      password: "1234",
    }),
  ).resolves.toBeTruthy();
});

test("Should throw with a bad password", async () => {
  await expect(
    decrypt({
      input: "test/encrypted.pdf",
      output: "test/output/decrypted.pdf",
      password: "4321",
    }),
  ).rejects.toThrow("qpdf: test/encrypted.pdf: invalid password\n");
});

test("Should decrypt a file without a password", async () => {
  await expect(
    decrypt({
      input: "test/encrypted-no-password.pdf",
      output: "test/output/decrypted-no-password.pdf",
    }),
  ).resolves.toBeTruthy();
});
