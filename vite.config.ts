import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'images/*.png',    // cache all PNGs
        'images/*.jpg',    // cache all JPGs
        'sounds/*.mp3'     // (if you have sound files)
      ],
      manifest: {
        name: 'Doodle Path Stories',
        short_name: 'DoodleStories',
        description: 'A fun educational game',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png', // ✅ use relative path
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png', // ✅ use relative path
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-domain\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      }
    }),
    mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
