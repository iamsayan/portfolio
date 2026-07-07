import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

import robotsTxt from "astro-robots-txt";

import compressor from "astro-compressor";

import purgecss from "astro-purgecss";

import og from "astro-og";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  site: env.SITE_URL || "http://localhost:4321",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), sitemap(), robotsTxt(), compressor(), og()],
});