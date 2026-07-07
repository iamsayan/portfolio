import { defineConfig, fontProviders, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { cacheVercel } from '@astrojs/vercel/cache';
import { loadEnv } from "vite";
import compressor from "astro-compressor";
import og from "astro-og";
import partytown from "@astrojs/partytown";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  site: env.SITE_URL || "http://localhost:4321",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    compressor(),
    og(),
    partytown(),
  ],
  fonts: [
    {
      name: "Outfit",
      cssVariable: "--font-outfit",
      provider: fontProviders.fontsource(),
      weights: ["300 800"],
      styles: ["normal"],
    },
    {
      name: "Sora",
      cssVariable: "--font-sora",
      provider: fontProviders.fontsource(),
      weights: ["300 800"],
      styles: ["normal"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.fontsource(),
      weights: ["400 700"],
      fallbacks: ["monospace"],
    }
  ],
  env: {
    schema: {
      API_URL: envField.string({ context: "server", access: "secret" }),
      API_KEY: envField.string({ context: "server", access: "secret" }),
      INBOX_TOKEN: envField.string({ context: "server", access: "secret" }),
      SITE_URL: envField.string({ context: "client", access: "public", default: "http://localhost:4321" }),
    }
  },
  security: {
    allowedDomains: [
      {
        hostname: '**.sayandatta.co.in',
        protocol: 'https'
      }
    ]
  },
  output: "static",
  adapter: vercel(),
  cache: {
    provider: cacheVercel(),
  }
})