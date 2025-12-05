/* eslint-disable sonarjs/no-hardcoded-passwords */
import { expect, test } from "vitest";

import { info } from "../src/info.js";

test("Should not work if no input file is specified", async () => {
  // @ts-expect-error This is what I'm testing
  await expect(info({})).rejects.toThrow("Please specify input file");
});

test("Should not work if the input file doesn't exist", async () => {
  await expect(info({ input: "bad_file_name.pdf" })).rejects.toThrow(
    "Input file doesn't exist",
  );
});

test("Should return the info for an encrypted file", async () => {
  await expect(
    info({
      input: "test/encrypted.pdf",
      password: "1234",
    }),
  ).resolves.toContain("file encryption method: AESv3");
});

test("Should return the info for a non-encrypted file", async () => {
  await expect(
    info({
      input: "test/example.pdf",
    }),
  ).resolves.toBe("File is not encrypted");
});
