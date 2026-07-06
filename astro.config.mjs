import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import Unfonts from "unplugin-fonts/astro";

export default defineConfig({
  site: "https://sayandatta.co.in",
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
