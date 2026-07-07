import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import Unfonts from "unplugin-fonts/astro";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  site: env.SITE_URL || "http://localhost:4321",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    sitemap(),
    Unfonts({
      google: {
        families: [
          {
            name: "Sora",
            styles: "wght@300;400;500;600;700;800",
          },
          {
            name: "Outfit",
            styles: "wght@300;400;500;600;700;800;900",
          },
          {
            name: "JetBrains Mono",
            styles: "wght@400;500;600;700",
          },
        ],
        display: "swap",
        injectTo: "head-prepend",
      },
    }),
  ],
});
