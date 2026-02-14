import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: { ...globals.node }
    },
    rules: {
      eqeqeq: "error",
      'no-console': 'off',
    }
  },
  { files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",
      ecmaVersion: 'latest',
    } 
  },
  {
    ignores: ['dist/**'],
  }
]);
