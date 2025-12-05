// @ts-check

import myConfig from "@sparticuz/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["dist", "coverage"],
  },
  ...myConfig,
  {
    rules: {
      "perfectionist/sort-union-types": [
        "error",
        {
          type: "natural",
        },
      ],
    },
  },
);
