// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx","../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
