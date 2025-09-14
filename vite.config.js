import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      manifest: {
        name: "Beacon",
        short_name: "B.con",
        theme_color: "#111",
        description: "Beacon : Designed for learners and builders",
        icons: [
          {
            src: "icons/bcon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons/bcon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/bcon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/bcon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/bcon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/bcon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/bcon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/bcon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/bcon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/bcon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: "*",
            handler: "CacheFirst",
          },
        ],
      },

      registerType: "prompt",
    }),
  ],
});
